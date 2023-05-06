class job {
    position
    description
    skills
    salary

     constructor(jobData) {
        this.position = jobData.position || null;
        this.description = jobData.description || null;
        this.skills = jobData.skills || null;
        this.salary = jobData.salary || null;
     }


}

module.exports = job;