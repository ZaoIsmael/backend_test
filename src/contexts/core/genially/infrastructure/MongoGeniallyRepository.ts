import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import {Collection, MongoClient} from "mongodb";

export default class MongoGeniallyRepository implements GeniallyRepository {
    private readonly COLLECTION = "genially";

    constructor(private _client: Promise<MongoClient>) {
        this._client = _client;
    }

    private async getCollection(): Promise<Collection> {
        return (await this._client).db().collection(this.COLLECTION);
    }

    public async save(genially: Genially): Promise<void> {
        const collection = await this.getCollection();

        const document = {
            name: genially.name.value,
            description: genially.description.value,
            _id: genially.id
        };

        await collection.updateOne({_id: genially.id}, {$set: document}, {upsert: true});
    }

    public async find(id: string): Promise<Genially> {
        const collection = await this.getCollection();

        const document = await collection.findOne({_id: id});

        return document ? Genially.fromRepository(id, document) : null;
    }

    public async delete(id: string): Promise<void> {
        const collection = await this.getCollection();

        await collection.deleteOne({_id: id});
    }
}
