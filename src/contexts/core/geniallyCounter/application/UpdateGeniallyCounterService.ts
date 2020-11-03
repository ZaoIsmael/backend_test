import GeniallyCounter from "../domain/GeniallyCounter";
import GeniallyCounterRepository from "../domain/GeniallyCounterRepository";

export default class UpdateGeniallyCounterService {
    constructor(private repository: GeniallyCounterRepository) {
        this.repository = repository;
    }

    public async execute(): Promise<void> {
        const geniallyCounter = await this.repository.find() || GeniallyCounter.create((Math.round(Math.random() * 10)).toString());

        geniallyCounter.increment();

        await this.repository.save(geniallyCounter);
    }
}
