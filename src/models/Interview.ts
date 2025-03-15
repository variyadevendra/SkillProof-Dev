import mongoose, { Schema, models, model } from 'mongoose';

// Interview Schema
const InterviewSchema = new Schema({
  candidateId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Mock', 'Real', 'Technical', 'Behavioral'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // Duration in minutes
    required: true
  },
  status: {
    type: String,
    enum: ['Requested', 'Scheduled', 'Completed', 'Cancelled', 'Rescheduled'],
    default: 'Requested'
  },
  meetingUrl: String,
  notes: {
    beforeInterview: String,
    afterInterview: String
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    strengths: [String],
    areasForImprovement: [String],
    comments: String,
    submittedAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create indexes for efficient querying
InterviewSchema.index({ candidateId: 1, date: 1 });
InterviewSchema.index({ employerId: 1, status: 1 });

// Don't recreate the model if it already exists
const Interview = models.Interview || model('Interview', InterviewSchema);

export default Interview; 