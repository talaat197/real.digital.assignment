const { Kafka } = require("kafkajs");

const run = async (value) => {
  try {
    const kafka = new Kafka({
      clientId: "real.digital",
      brokers: ["localhost:29092"],
    });
    
    const producer = kafka.producer({maxInFlightRequests: 1 , idempotent: true});
    await producer.connect();

    console.log('connecting to output producer...');

    await producer.send({
        "topic" : "data-output",
        messages : [{
            value: "" + value,
            partition: 0,
        }]
    })

    await producer.disconnect()
  } catch (error) {
    console.error("Something went wrong" , error);
  }
  finally{
      console.log('success producer')
  }
};

module.exports = {
    produceOutput : run
}
