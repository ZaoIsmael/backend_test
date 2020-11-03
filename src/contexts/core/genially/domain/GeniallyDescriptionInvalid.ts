export default class GeniallyDescriptionInvalid extends Error {
    constructor(description: string) {
        super(`Genially <${description}> cannot have more than 125 characters`);
    }
}
