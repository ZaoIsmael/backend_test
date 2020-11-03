import GeniallyDescriptionInvalid from "./GeniallyDescriptionInvalid";

export default class GeniallyDescription {
    private _value: string;

    constructor(description?: string) {
        if (description && description.length > 125) {
            throw new GeniallyDescriptionInvalid(description);
        }

        this._value = description;
    }

    get value(): string {
        return this._value;
    }
}
