import paho.mqtt.client as mqtt
import uuid
import json

MQTT_URL = "localhost"
MQTT_PORT = 1883
MQTT_KEEPALIVE_INTERVAL = 45
MQTT_TOPIC = "MQTTTest"
MQTT_MSG = json.dumps({ "message": "hi"});
MQTT_USER = "HDB_ADMIN"
MQTT_PASSWORD = "password"
MQTT_MESSAGEID = str(uuid.uuid4())
MQTT_QOS = 1
MQTT_INSERT_INTO_TABLE = True

def on_publish(client, userdata, mid):
    print("published " + MQTT_MSG + " to " + MQTT_TOPIC + "/" + MQTT_MESSAGEID)
    client.disconnect()

def on_subscribe(mqttc, obj, mid, granted_qos):
    print("subscribed topic: " + MQTT_TOPIC + "/#  QoS: " + str(granted_qos))

def on_connect(client, userdata, flags, rc):
    print('mqtt client connected')
    client.subscribe(MQTT_TOPIC + "/#")
    client.publish(MQTT_TOPIC + "/" + MQTT_MESSAGEID, MQTT_MSG, qos=MQTT_QOS, retain=MQTT_INSERT_INTO_TABLE)

def on_message(client, userdata, msg):
    payload = json.loads(msg.payload) # you can use json.loads to convert string to json
    print("received " + str(payload))

# Initiate MQTT Client
mqttc = mqtt.Client()

# Register publish callback function
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.username_pw_set(MQTT_USER, MQTT_PASSWORD)

# Connect with MQTT Broker
mqttc.connect(MQTT_URL, MQTT_PORT, MQTT_KEEPALIVE_INTERVAL)

# Loop forever
mqttc.loop_forever()
