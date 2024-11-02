import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

export class Retriever {
    static async initialize() {
        const url = "https://bmwi.bimmerpost.com/forums/forumdisplay.php?f=923";
        
        // Initialize loader
        const loader = new CheerioWebBaseLoader(url, {
            selector: "div.post, div.thread-content",
            transformElement: (element) => ({
                title: element.find('.thread-title').text(),
                content: element.find('.post-content').text(),
                dtcCode: element.find('.dtc-code').text(),
                date: element.find('.post-date').text()
            })
        });

        // Load and process documents
        const docs = await loader.load();
        
        // Split documents
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 300,
            chunkOverlap: 30,
        });
        const docSplits = await textSplitter.splitDocuments(docs);

        // Create vector store
        const vectorStore = await MemoryVectorStore.fromDocuments(
            docSplits,
            new OpenAIEmbeddings(),
            {
                metadataFields: ["dtcCode", "date", "title"]
            }
        );

        // Create retriever instance
        const instance = new Retriever();
        instance.vectorStore = vectorStore;
        instance.model = new ChatOpenAI({ temperature: 0 });
        
        return instance;
    }

    async query(question) {
        const retriever = this.vectorStore.asRetriever({
            searchType: "similarity",
            searchKwargs: { k: 5 },
            filter: (doc) => doc.metadata.dtcCode !== null
        });

        const results = await retriever.getRelevantDocuments(question);
        
        // Generate response using ChatGPT
        const context = results.map(doc => doc.pageContent).join('\n\n');
        const response = await this.model.invoke([
            new HumanMessage(
                `Based on the following forum discussions, please answer this question: ${question}\n\nContext: ${context}`
            )
        ]);

        return response.content;
    }
} 