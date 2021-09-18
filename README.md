Real Digital Assignment

This assignment is depend on Apache Kafka with 2 topics data-input with 10 partitions , data-output with 1 partition 

We use external sorting with heap sort to solve -> the number of messages can exceed the amount of memory available on the machine executing the code.
Inside the temp folder there's an output.txt file , this file represent the sorted partitions
Inside the temp folder there's a runs folder that contains runs files representing the sorted batches came from data-input topic

The external sorting algorithm depends on the runs files each run file is a sorted array and the output file is the combination of those sorted arrays.

The concurrency issue here produced when we run multiple consumers that will make sorting on the output file at the same time, we use a lockfile library to lock the lock the external sorting from concurrency actions.
# Installation
- install node js
- install docker and type `docker-compose up --build` that will build one broker with zookeeper
- npm install
- run the topics ->   `node ./src/topic`
- input-data file inside src folder is the sample data we use to test the assignment
- to run the input producer `node ./src/data-input-producer.js`
- to run consumer for the inputs to make the external sorting  `node ./src/data-input-consumer.js`  you can run it multiple times to make consumer for each partition max partitions to run is 10
- to run consumer for the data-output topic `node ./src/data-output-consumer`

note: inside temp you have to create runs directory if it's not there.