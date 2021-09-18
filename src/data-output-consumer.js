const { Kafka } = require("kafkajs");
const { addInputValue } = require("./FileHandler");
const { externalSort } = require('./external-sort')

run = async () => {
  try {

    const kafka = new Kafka({
      clientId: "real.digital",
      brokers: ["localhost:29092"],
    });

    const consumer = kafka.consumer({
        "groupId" : "real-output-group"
    });
    await consumer.connect();
    console.log('connecting to data output consumer...');

    await consumer.subscribe({
        topic : 'data-output',
        fromBeginning : true,
    })
    
    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
                topic,
                partition
            })
        },
    })

  } catch (error) {
    console.error("Something went wrong" , error);
  }
};

run();
