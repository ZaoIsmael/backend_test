import GeniallyNameInvalid from "./GeniallyNameInvalid";

export default class GeniallyName {
    private _value: string;

    constructor(name: string) {
        if (name.length < 3 && name.length > 25) {
            throw new GeniallyNameInvalid(name);
        }

        this._value = name;
    }

    get value(): string {
        return this._value;
    }
}
