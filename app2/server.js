const job= require("./models/job.js")
const express = require("express");
const mongoose = require("mongoose");
const kafka = require('kafka-node');
const jobRouter = require("./Routes/JobRoutes");
const {CreateJob,DeleteJob} =require("./Services/JobService") ;

const app = express();

//connection to database
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 27017;
const DB_HOST = "mongo";

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose
  .connect(URI)
  .then(() => {
    console.log(`connected to database `);
  })
  .catch((err) => {
    console.log(`error happened ${err}`);
  });
/*--------------------------------------------------------*/
// connection to kafka
// const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });

const consumerGroup = new kafka.ConsumerGroup(
  {
    kafkaHost: 'kafka:9092',
    groupId: 'test-group'
  },
  'jobs'
);

consumerGroup.on('ready', function() {
  console.log('Consumer is ready!');
});



consumerGroup.on('message', (message) => {
  console.log(message.value); //console to screen 
  
  const msg = JSON.parse(message.value);
  
  if (msg.hasOwnProperty('method') ){

    DeleteJob(msg.id)
  
    }
    
  else{
    newjob = new job(msg)
    CreateJob(newjob)

  }  
    
});

consumerGroup.on('error', (err) => {
  console.error('Error: ', err);
});

consumerGroup.on('offsetOutOfRange', (err) => {
  console.error('OffsetOutOfRangeError: ', err);
});

/*--------------------------------------------------------*/

// using port
app.use(express.json())
app.use("/api/jobs", jobRouter);


app.listen(8083, () => {
  console.log("consumer is listening on port 8083 :)");
});



















// const express=require("express")
// const kafka=require("kafka-node")
// const app=express();
// app.use(express.json())
// app.listen(process.env.PORT || 8080)

// const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
// const consumer = new kafka.Consumer(
//   client,
//   [{ topic: 'jobs' }],
//   {
//     autoCommit: false,
//     fromOffset: 'latest',
//     debug: 'all'
//   }
// );

// consumer.on('message', (message) => {
//   console.log(JSON.parse(message.value));
// });

// consumer.on('error', (err) => {
//   console.error('Error: ', err);
// });