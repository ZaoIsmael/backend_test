export default class GeniallyCounter {
    private readonly _id: string;
    private _total: number;

    private constructor(id: string, total: number) {
        this._id = id;
        this._total = total;
    }

    get id(): string {
        return this._id;
    }

    get total(): number {
        return this._total;
    }

    public increment(): void {
        this._total++;
    }

    public static create(id: string) {
        return new GeniallyCounter(
            id,
            0
        );
    }

    public static fromRepository(id: string, data: any) {
        const {total} = data;
        return new GeniallyCounter(
            id,
            total
        );
    }
}
