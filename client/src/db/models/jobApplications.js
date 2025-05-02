const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
    jobPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost",
        required: true,
    },
    fullName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost",
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
    cv: {
        type: String,
        required: true,
    },
    answers: {
        type: [String],
        required: true,
    },  
});

const jobApplications = mongoose.model("jobApplications", jobApplicationSchema);
module.exports = jobApplications;