import mongoose, { Schema, models, model } from 'mongoose';

// Submission Schema
const SubmissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
  challengeCreatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  githubUrl: String,
  deploymentUrl: String,
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'In Review', 'Completed', 'Rejected'],
    default: 'Submitted'
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: {
    content: String,
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    date: Date
  },
  completionTime: Number, // Time taken to complete in minutes
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create indexes for efficient querying
SubmissionSchema.index({ userId: 1, challengeId: 1 });
SubmissionSchema.index({ challengeCreatedBy: 1, status: 1 });

// Don't recreate the model if it already exists
const Submission = models.Submission || model('Submission', SubmissionSchema);

export default Submission; 