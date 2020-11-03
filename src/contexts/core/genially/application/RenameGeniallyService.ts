import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyName from "../domain/GeniallyName";

type RenameGeniallyServiceRequest = {
    id: string;
    name: string;
};

export default class RenameGeniallyService {
    constructor(private repository: GeniallyRepository) {
        this.repository = repository;
    }

    public async execute(req: RenameGeniallyServiceRequest): Promise<Genially> {
        const {id, name} = req;

        const genially = await this.repository.find(id);

        genially.rename(new GeniallyName(name));

        await this.repository.save(genially);

        return genially;
    }
}
