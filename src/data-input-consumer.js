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
        "groupId" : "real-group"
    });
    await consumer.connect();
    console.log('connecting to consumer...');

    await consumer.subscribe({
        topic : 'data-input',
        fromBeginning : true,
    })
    
    consumer.run({
      eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {
        const filename = "runs_"+batch.partition+".txt";

        for (let message of batch.messages) {
          let value = message.value.toString();  
          addInputValue(value , filename)
         
          await resolveOffset(message.offset)
          await heartbeat()
        }
         await externalSort()
      },
    })

  } catch (error) {
    console.error("Something went wrong" , error);
  }
};

run();
