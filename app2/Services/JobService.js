const Job = require("../models/jobModel");



exports.CreateJob = async (newjob) => {
  const job = await Job.create(newjob);
  if(job){
    console.log("saved Succesfully");
  }
  else{
    console.log("error happened , try again :)");
  }
  
};


exports.DeleteJob = async (job_id) => {
  const job = await Job.findByIdAndDelete(job_id);
  if (!job) {
    console.log("not exist")
  
  }
  
  console.log(`deleted successfully ${job}`)
};

exports.GetJobByID = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ status: " not exist " });
  }
  res.status(200).json({ data: job });
};



exports.GetAllJobs = async (req, res) => {
  const jobs = await Job.find();
  if (!jobs) {
    return res.status(404).json({ status: " not exist " });
  }
  res.status(200).json({ data: jobs });
};
