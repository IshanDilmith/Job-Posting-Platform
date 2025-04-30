const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        questions: {
            type: [String],
        },
        emailForNotifications: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

const jobPost = mongoose.model("JobPost", jobPostSchema);
module.exports = jobPost;
    