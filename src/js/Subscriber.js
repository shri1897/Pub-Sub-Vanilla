import Broker from './Broker'

class Subscriber {
    constructor(topic, callBack) {
        this.topic = topic;
        this.subscriberID = Broker.prototype.subscribe(topic, callBack);
    }

    unsubscribe() {
        Broker.prototype.unsubscribe(this.subscriberID, this.topic);
    }
}

export default Subscriber;