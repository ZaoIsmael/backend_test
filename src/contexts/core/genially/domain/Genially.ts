import GeniallyName from "./GeniallyName";
import GeniallyDescription from "./GeniallyDescription";
import {GeniallyCreatedEvent} from "./GeniallyCreatedEvent";
import AggregateRoot from "../../../shared/Domain/AggregateRoot";

export default class Genially extends AggregateRoot {
    private _id: string;
    private _name: GeniallyName;
    private _description: GeniallyDescription;
    private _createdAt: Date;
    private _modifiedAt: Date;
    private _deletedAt: Date;

    private constructor(id: string, name: GeniallyName, description?: GeniallyDescription) {
        super();
        this._id = id;
        this._name = name;
        this._description = description;
        this._createdAt = new Date();
    }

    get id(): string {
        return this._id;
    }

    get name(): GeniallyName {
        return this._name;
    }

    get description(): GeniallyDescription {
        return this._description;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get modifiedAt(): Date {
        return this._modifiedAt;
    }

    get deletedAt(): Date {
        return this._deletedAt;
    }

    public rename(name: GeniallyName): void {
        this._name = name;
    }

    public delete(): void {
        this._deletedAt = new Date();
    }

    public static create(id: string, name: GeniallyName, description?: GeniallyDescription): Genially {
        const genially = new Genially(id, name, description);

        const event = new GeniallyCreatedEvent(id, name.value, description.value);

        genially.push(event);

        return genially;
    }

    public static fromRepository(id: string, data: any): Genially{
        const { name, description } = data;

        return new Genially(
            id,
            new GeniallyName(name),
            new GeniallyDescription(description)
        );
    }
}
