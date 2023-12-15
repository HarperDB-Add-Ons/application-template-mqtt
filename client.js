import mqtt from "mqtt";

const mqttUrl = "mqtts://localhost:8883";
const tableName = "MQTTTest";
const user = "HDB_ADMIN";
const password = "password";
const qos = 1;
const messageID = crypto.randomUUID();
const insertIntoTable = true;

const client1 = mqtt.connect(mqttUrl, {
  clientId: user,
  username: user,
  password: password,
  rejectUnauthorized: false,
});

client1.on("error", (args) => console.log("error", args));

client1.on("message", (topic, message) => {
  console.log("received", message.toString());
  setTimeout(process.exit, 1000);
});

client1.on("connect", () => {
  console.log("mqtt client connected");
  client1.subscribe(tableName + "/#", { qos }, (err, granted) =>
    console.log("subscribed", granted)
  );
  client1.publish(
    tableName + "/" + messageID,
    JSON.stringify({ message: "hi" }),
    { qos, retain: insertIntoTable },
    (err, granted) =>
      console.log(
        "published",
        granted.payload,
        "to:",
        tableName + "/" + messageID
      )
  );
});
