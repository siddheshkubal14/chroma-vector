
// // Mock ChromaClient for local testing
// // class MockCollection {
// //     name: string;
// //     documents: string[] = [];
// //     ids: string[] = [];
// //     constructor(name: string) {
// //         this.name = name;
// //     }
// //     async upsert({ documents, ids }: { documents: string[]; ids: string[] }) {
// //         this.documents = documents;
// //         this.ids = ids;
// //         return { ids };
// //     }
// //     async query({ queryTexts, nResults }: { queryTexts: string[]; nResults: number }) {
// //         // Return mock results
// //         return {
// //             ids: this.ids.slice(0, nResults),
// //             documents: this.documents.slice(0, nResults),
// //             distances: Array(nResults).fill(0.5),
// //         };
// //     }
// // }

// // class MockChromaClient {
// //     collections: MockCollection[] = [];
// //     async createCollection({ name }: { name: string }) {
// //         const collection = new MockCollection(name);
// //         this.collections.push(collection);
// //         return collection;
// //     }
// //     async listCollections() {
// //         return this.collections;
// //     }
// // }

// // const client = new MockChromaClient();

// async function main() {
//     const collection = await client.createCollection({
//         name: "my_collection",
//     });
//     console.log("Collection created:", collection.name);

//     const allCollections = await client.listCollections();
//     console.log("All collections:", allCollections.map(col => col.name));

//     // switch `addRecords` to `upsertRecords` to avoid adding the same documents every time
//     await collection.upsert({
//         documents: [
//             "This is a document about pineapple",
//             "This is a document about oranges",
//         ],
//         ids: ["id1", "id2"],
//     });

//     const results = await collection.query({
//         queryTexts: ["This is a query document about florida"], // Chroma will embed this for you
//         nResults: 2, // how many results to return
//     });

//     console.log(results);

// }

// main();



import { ChromaClient } from "chromadb";

async function main() {
    const client = new ChromaClient({
        host: "localhost",
        port: 8000,
        ssl: false,
    });

    // Create or get a collection
    const collection = await client.getOrCreateCollection({ name: "my_collection" });

    // Add documents
    await collection.upsert({
        ids: ["id1", "id2"],
        documents: ["What's the weather in Berlin", "What a beautiful day"],
        metadatas: [{ source: "note1" }, { source: "note2" }],
    });

    // Query
    const results = await collection.query({
        nResults: 2, // how many results to return
        queryTexts: ["is it hot?"],  // Chroma will embed this for you
    });

    console.log(results);
}

main();
