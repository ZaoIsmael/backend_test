import { MongoClient } from "mongodb";

export class MongoFactory {
    static async getClient() {
        // añadir variable de entorno para la conexion
        const client = new MongoClient("mongodb://mongo:27017/dev", {useUnifiedTopology: true, ignoreUndefined: true});

        return await client.connect();
    }
}