import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

type DeleteGeniallyServiceRequest = {
    id: string;
};

export default class DeleteGeniallyService {
    constructor(private repository: GeniallyRepository) {
      this.repository = repository;
    }

  public async execute(req: DeleteGeniallyServiceRequest): Promise<Genially> {
      const { id } = req;

      const genially = await this.repository.find(id);

      genially.delete();

      await this.repository.save(genially);

      return genially;
  }
}
