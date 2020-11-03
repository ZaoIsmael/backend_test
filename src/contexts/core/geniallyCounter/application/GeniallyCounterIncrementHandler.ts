import UpdateGeniallyCounterService from "./UpdateGeniallyCounterService";
import Subscriber from "../../../shared/Domain/Subscriber";
import {GeniallyCreatedEvent} from "../../genially/domain/GeniallyCreatedEvent";

export class GeniallyCounterIncrementHandler implements Subscriber {
    public service: UpdateGeniallyCounterService;
    public eventNameSubscriber: string = GeniallyCreatedEvent.EVENT_NAME;

    constructor(service: UpdateGeniallyCounterService) {
        this.service = service;
    }

    public async on(event: GeniallyCreatedEvent): Promise<void> {
        await this.service.execute();
    }
}
