// ----- Publish Example ------

const express = require('express')
const server = express()
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org') //publicbroker
const port = 3000;

server.get('/message', function (req, res) {

    // Publish message to MQTT
    client.publish(topic, req.query.data);
    res.sendStatus(200);

})

server.listen(port, () => {
console.log(`listening to port ${port}`)
});

// ----- Subscribe Example ------

const mqtt = require('mqtt')
const client2 = mqtt.connect('mqtt://test.mosquitto.org')
const topic = "meow"

client2.on('connect', function () {

    console.log(`connected to mqtt broker`);

    client.subscribe(topic, function (err) {
        console.error(`subscribe to topic ${topic} encountered error: ${err}`);
    })

})

client2.on("message", function (topic, message) {
console.log("received message:", String(message));
})

// as noticed, on connect event we subscribe
// on message event, we log.
