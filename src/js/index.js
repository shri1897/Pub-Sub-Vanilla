import Publisher from './Publisher'
import Subscriber from './Subscriber'

const subscriptions = window.subscriptions = {};

let publishButton = document.getElementById('publish');
let publishInputTopic = document.getElementById('publish-topic');
let publishInputMessage = document.getElementById('publish-message');
let subscribeButton = document.getElementById('subscribe');
let unsubscribeButton = document.getElementById('unsubscribe');
let subscribeInputTopic = document.getElementById('subscribe-topic');
let subscribeOutputArea = document.getElementById('subscribe-log');
let clearButton = document.getElementById('clear');

publishButton.onclick = function () {
    let topic = publishInputTopic.value;
    let message = publishInputMessage.value;
    if (topic && message) {
        Publisher.publish(topic, message);
    }
}

subscribeButton.onclick = function () {
    let topic = subscribeInputTopic.value;
    if (topic && !subscriptions[topic]) {
        subscriptions[topic] = new Subscriber(topic, callBack);
        subscribeOutputArea.innerHTML += `<br><span class='green-text'>[[SUBSCRIBED]]:</span> ${topic}`;
    }
}

unsubscribeButton.onclick = function () {
    let topic = subscribeInputTopic.value;
    if (topic && subscriptions[topic]) {
        subscriptions[topic].unsubscribe();
        delete subscriptions[topic];
        subscribeOutputArea.innerHTML += `<br><span class='red-text'>[[UNSUBSCRIBED]]:</span> ${topic}`;
    }
}

clearButton.onclick = function () {
    subscribeOutputArea.innerHTML = '';
}

function callBack(payload) {
    if (payload.message) {
        console.log(`[${payload.topic}]: ${payload.message}`);
        subscribeOutputArea.innerHTML += `<br><span class='orange-text'>[[${payload.topic}]]:</span> ${payload.message}`;
    } else {
        console.log(`${payload.topic}: No Message Receivied`);
    }
}