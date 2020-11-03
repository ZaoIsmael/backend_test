export default class GeniallyNameInvalid extends Error {
    constructor(name: string) {
        super(`Genially <${name}> must be between 3 and 25 characters`);
    }
}
