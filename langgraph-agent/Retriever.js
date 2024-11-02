import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";

// Update URL to point to BMW forum
const url = "https://bmwi.bimmerpost.com/forums/forumdisplay.php?f=923";

// Load forum data
const loader = new CheerioWebBaseLoader(url, {
  // Add selectors to target forum posts and threads
  selector: "div.post, div.thread-content",
  // Custom transform to extract DTC codes and discussions
  transformElement: (element) => {
    return {
      title: element.find('.thread-title').text(),
      content: element.find('.post-content').text(),
      dtcCode: element.find('.dtc-code').text(), // Add selector for DTC codes
      date: element.find('.post-date').text()
    };
  }
});

const docs = await loader.load();

// Split documents with smaller chunks for DTC code discussions
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 300, // Smaller chunks for focused DTC content
  chunkOverlap: 30,
});
const docSplits = await textSplitter.splitDocuments(docs);

// Add to vectorDB with custom metadata for DTC codes
const vectorStore = await MemoryVectorStore.fromDocuments(
  docSplits,
  new OpenAIEmbeddings(),
  {
    // Add metadata fields for better DTC code retrieval
    metadataFields: ["dtcCode", "date", "title"]
  }
);

const retriever = vectorStore.asRetriever({
  // Configure retriever for DTC code queries
  searchType: "similarity",
  searchKwargs: { k: 5 }, // Return top 5 relevant results
  filter: (doc) => doc.metadata.dtcCode !== null // Only return docs with DTC codes
});