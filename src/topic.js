const { Kafka } = require("kafkajs");

run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "real.digital",
      brokers: ["localhost:29092"],
    });
    const admin = kafka.admin();
    await admin.connect();
    console.log('connecting...')
    await admin.createTopics({
      topics: [
        {
          topic: "data-input",
          numPartitions: 10,
        },
        {
          topic: "data-output",
          numPartitions: 1,
        },
      ],
    });
    console.log('creating topics...')

    await admin.disconnect()
  } catch (error) {
    console.error("Something went wrong" , error);
  }
  finally{
      console.log('success')
      process.exit();
  }
};

run();
