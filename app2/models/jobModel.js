const mongoose = require("mongoose");

const jobShcema = new mongoose.Schema(
    {
        position : {
            type: String,
            
          }, 
        description: {
            type: String,
            
          },
        skills: {
            type: String,
            
          },
        
        salary: {
            type: Number,
           
          }

    } , 
    {
        timestamps: true
    }
)

const Job = mongoose.model("Job", jobShcema);

module.exports = Job;