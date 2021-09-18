const { Kafka } = require("kafkajs");
const getInput = require("./input-data");

run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "real.digital",
      brokers: ["localhost:29092"],
    });
    
    // idempotent : ensuring that messages always get delivered, in the right order and without duplicates.
    // the acks configuration will automatically be set to all for you. if idempotent = true
    // maxInFlightRequests : property represents the number of not processed requests that can be buffered on the producer's side. It was introduced to minimize the waiting time of the clients 
    // by letting them send requests even though some of the prior ones are still processed by the broker.
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
