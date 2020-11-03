export class GeniallyCreatedEvent {
    public static EVENT_NAME: string = "genially.created";

    public readonly _id: string;
    readonly _name: string;
    readonly _description: string;
    readonly _occurredOn: Date;
    private _eventName: string;

    constructor(id: string, name: string, description?: string) {
        this._eventName = GeniallyCreatedEvent.EVENT_NAME;
        this._id = id;
        this._name = name;
        this._description = description;
        this._occurredOn = new Date();
    }
}