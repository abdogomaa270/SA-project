const job= require("./models/job.js")
const express=require("express")
const kafka=require("kafka-node")

const app = express();
app.use(express.json())


const client =new kafka.KafkaClient( {kafkaHost:'kafka:9092'} )
const producer= new kafka.Producer(client)

// start listning on kafka
producer.on('ready', () => {
  console.log('Kafka producer is ready'); 
});

producer.on('error', (err) => {
  console.error('Kafka producer error: ', err);
});
/*--------------------------------------------------------------------------*/
// Routes 
app.post('/create',(req, res) => {

  const newJob = new job(req.body); // 1
  
  const data = JSON.stringify(newJob); 
   
  const message = {
    topic: 'jobs',
    messages: data
  };

  producer.send( [message],  (err, result) => {
    if (err) {
      console.error('Kafka producer send error: ', err);
      res.status(500).send({ error: 'Error sending message to Kafka' });
    } else {
      console.log('Kafka producer send job: ', message); //console to screen 
      res.send({ message: 'Message sent to Kafka'});  
    }
  });
});

/* NEW */
app.delete('/deleteJob/:id',(req,res)=>{
  
 const data = {
  method : "dalete",
  id : req.params.id
  }

  const message ={
    topic: 'jobs',
    messages: JSON.stringify(data)
  };

producer.send([message], (err, result) => {
    if (err) {
      console.error('Kafka producer send error: ', err);
      res.status(500).send({ error: 'Error sending message to Kafka' });
    } else {
      console.log('Kafka producer send job: ', data); //console to screen 
      res.status(200).send({ message: 'Message sent to Kafka'});
    }
  });
})


app.listen(8080,()=>{
  console.log("producer is listening on port 8080 :)")
})





















//version 2
// producer.on('ready', function () {
//     console.log('Kafka producer is ready');
  
//     const message = {
//       topic: 'jobs',
//       messages: 'Hello Kafka!'
//     };
  
//     setInterval(function() {
//       producer.send([message], function (err, data) {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log('Message sent:', data);
//         }
//       });
//     }, 3000); // send message every 3 seconds
//   });















