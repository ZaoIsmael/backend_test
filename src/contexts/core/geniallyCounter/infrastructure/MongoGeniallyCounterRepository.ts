import GeniallyCounterRepository from "../domain/GeniallyCounterRepository";
import {Collection, MongoClient} from "mongodb";
import GeniallyCounter from "../domain/GeniallyCounter";

export default class MongoGeniallyCounterRepository implements GeniallyCounterRepository {
    private readonly COLLECTION = "geniallyCounter";

    constructor(private _client: Promise<MongoClient>) {
        this._client = _client;
    }

    private async getCollection(): Promise<Collection> {
        return (await this._client).db().collection(this.COLLECTION);
    }

    public async save(geniallyCounter: GeniallyCounter): Promise<void> {
        const collection = await this.getCollection();

        const document = {
            total: geniallyCounter.total,
            _id: geniallyCounter.id
        };

        await collection.updateOne({_id: geniallyCounter.id}, {$set: document}, {upsert: true});
    }

    public async find(): Promise<GeniallyCounter> {
        const collection = await this.getCollection();

        const document = await collection.findOne({});

        return document ? GeniallyCounter.fromRepository(document._id, document) : null;
    }

    public async delete(id: string): Promise<void> {
        const collection = await this.getCollection();

        await collection.deleteOne({_id: id});
    }
}
