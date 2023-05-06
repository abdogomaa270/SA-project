const express = require("express")
const router = express.Router();

const {
    CreateJob ,
    DeleteJob,
    GetAllJobs,
    GetJobByID
} = require("../Services/JobService")


router.route("/")
.get(GetAllJobs)
.post(CreateJob);

router.route("/:id")
.get(GetJobByID)
.delete(DeleteJob)





module.exports=router ;