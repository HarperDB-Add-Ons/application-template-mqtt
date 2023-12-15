import mqtt from "mqtt";

const mqttUrl = "mqtts://localhost:8883";
const tableName = "MQTTTest";
const user = "HDB_ADMIN";
const password = "password";
const qos = 1;

const client1 = mqtt.connect(mqttUrl, {
  clientId: user,
  username: user,
  password: password,
  rejectUnauthorized: false,
});

client1.on("error", (args) => console.log("error", args));

client1.on("message", (topic, message) =>
  console.log("received", message.toString())
);

client1.on("connect", () => {
  console.log("mqtt client connected");
  client1.subscribe(tableName, { qos }, (err, granted) =>
    console.log("subscribed", granted)
  );
  client1.publish(
    tableName,
    JSON.stringify({ id: crypto.randomUUID(), message: "hi" }),
    { qos, retain: true },
    (err, granted) => console.log("published", granted.payload)
  );
});
