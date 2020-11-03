import {EventEmitter} from "events";
import Subscriber from "../Domain/Subscriber";

export default class EventBus extends EventEmitter {
    constructor() {
        super();
    }

    public addSubscriber(subscribers: Array<Subscriber>) {
        subscribers.forEach(subscriber => {
            this.on(subscriber.eventNameSubscriber, subscriber.on.bind(subscriber));
        });
    }

    public publish(events: Array<any>) {
        events.forEach(event => {
            this.emit(event._eventName, event);
        });
    }
}