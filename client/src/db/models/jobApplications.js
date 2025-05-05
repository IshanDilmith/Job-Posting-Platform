const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
    jobPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost",
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    questions: {
        type: [String]
    },
    answers: {
        type: [String]
    },  
});

const jobApplications = mongoose.model("jobApplications", jobApplicationSchema);
module.exports = jobApplications;