import * as dotenv from 'dotenv';
import { HumanMessage } from "@langchain/core/messages";
import { Retriever } from './Retriever.js';  // Note the .js extension

dotenv.config();

async function main() {
    try {
        const retriever = await Retriever.initialize();
        const query = "What are common solutions for BMW DTC code P0171?";
        const response = await retriever.query(query);
        
        console.log("Query:", query);
        console.log("Response:", response);
    } catch (error) {
        console.error("Error:", error);
    }
}

main(); 