# MQTT Application Template

This is a template for building [HarperDB](https://www.harperdb.io/) MQTT applications.

---

### Prepare HarperDB MQTT

To enable MQTT in HarperDB, update the `harperdb-config.yaml` file in the root of your `hdb` folder (default location `~/hdb/`): 

```
mqtt:
  network:
    port: 1883
    securePort: 8883
  webSocket: false
  requireAuthentication: true
```

---

### Installing This Application

Clone this repo into your components folder (default `~/hdb/components/`).

Enter the folder using your terminal, and install the single dependency from npm (mqtt):

```npm i -s mqtt```


---

### Configuration

There are only two files relevant to this demo:

#### schema.graphql
The [schema.graphql](./schema.graphql) is the schema definition. This is the main starting point for defining your database schema. In this template, we create a `MQTTTest` table in a `data` database. You can change the name of the table by folowng these directions: 

- https://docs.harperdb.io/docs/developers/applications/defining-schemas

#### client.js
A template NodeJS MQTT client. The configuration is found at the top of the file. Please note that 

```
const mqttUrl = "mqtts://localhost:8883";
const topicName = "MQTTTest";
const qosLevel = 1;
const user = "HDB_ADMIN";
const password = "password";
```

### Running The Demo

To publish a message and insert it into the `MQTTTest` table, type the following into a terminal from the project directory:

```node client.js```
