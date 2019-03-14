import Broker from './Broker'

class Publisher { }

Publisher.publish = function (topic, message) {
    Broker.prototype.publish(topic, message);
}

export default Publisher;