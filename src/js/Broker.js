const topics = window.topics = {};

class Broker {

    publish(topic, message) {
        let currentTopic = topics[topic];
        if (currentTopic) {
            for (let id in currentTopic) {
                currentTopic[id].call(null, { topic, message });
            }
        }
    }

    subscribe(topic, callBack) {
        let subscriberID = Date.now();
        if (topics[topic]) {
            topics[topic][subscriberID] = callBack;
        } else {
            topics[topic] = {};
            topics[topic][subscriberID] = callBack;
        }
        return subscriberID;
    }

    unsubscribe(subscriberID, topic) {
        delete topics[topic][subscriberID];
        if (Object.entries(topics[topic]).length === 0) {
            delete topics[topic];
        }
    }
}

export default Broker;