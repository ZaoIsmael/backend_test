import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyName from "../domain/GeniallyName";
import GeniallyDescription from "../domain/GeniallyDescription";
import EventBus from "../../../shared/infrastructure/EventBus";

type CreateGeniallyServiceRequest = {
    id: string;
    name: string;
    description: string;
};

export default class CreateGeniallyService {
    constructor(private repository: GeniallyRepository, private bus: EventBus) {
    }

    public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
        const {id, name, description} = req;

        const genially = Genially.create(
            id,
            new GeniallyName(name),
            new GeniallyDescription(description)
        );

        await this.repository.save(genially);

        this.bus.publish(genially.pull());

        return genially;
    }
}
