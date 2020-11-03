import GeniallyCounter from "./GeniallyCounter";

interface GeniallyCounterRepository {
    save(genially: GeniallyCounter): Promise<void>;

    find(): Promise<GeniallyCounter>;

    delete(id: string): Promise<void>;
}

export default GeniallyCounterRepository;
