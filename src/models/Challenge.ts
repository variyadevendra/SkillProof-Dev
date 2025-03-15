import mongoose, { Schema, models, model } from 'mongoose';

// Challenge Schema
const ChallengeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Algorithm', 'Project', 'Bug Fixing', 'System Design', 'API Integration']
  },
  skills: {
    type: [String],
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  },
  estimatedTime: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  evaluationCriteria: [String],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Active', 'Archived'],
    default: 'Active'
  },
  submissions: {
    type: Number,
    default: 0
  },
  completions: {
    type: Number,
    default: 0
  },
  ratings: [{
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Calculate average rating when new ratings are added
ChallengeSchema.pre('save', async function(next) {
  if (this.isModified('ratings')) {
    if (this.ratings.length > 0) {
      const total = this.ratings.reduce((sum, item) => sum + item.rating, 0);
      this.averageRating = total / this.ratings.length;
    }
  }
  next();
});

// Don't recreate the model if it already exists
const Challenge = models.Challenge || model('Challenge', ChallengeSchema);

export default Challenge; 