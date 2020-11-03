interface Subscriber {
    eventNameSubscriber: string;

    on(event: any): Promise<void>;
}

export default Subscriber;