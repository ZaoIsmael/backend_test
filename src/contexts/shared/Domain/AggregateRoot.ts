export default abstract class AggregateRoot {
    private readonly events: Array<object>;

    protected constructor() {
        this.events = [];
    }

    push(event: object): void {
        this.events.push(event);
    }

    pull(): Array<object> {
        return this.events;
    }
}