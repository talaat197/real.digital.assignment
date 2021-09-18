const { Kafka } = require("kafkajs");
const getInput = require("./input-data");

run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "real.digital",
      brokers: ["localhost:29092"],
    });
    
    const producer = kafka.producer({maxInFlightRequests: 1 , idempotent: true});
    await producer.connect();

    console.log('connecting to producer...');

    const result = await producer.send({
        "topic" : "data-input",
        messages : getInput()
    })

    console.log('result of producer' , result)

    await producer.disconnect()
  } catch (error) {
    console.error("Something went wrong" , error);
  }
  finally{
      console.log('success producer')
      process.exit();
  }
};

run();
