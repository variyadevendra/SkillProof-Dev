import mongoose, { Schema, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  role: string;
  skills: ISkill[];
  company?: string;
  position?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  lastActive: Date;
}

// Skill Schema
const SkillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  progressHistory: [{
    date: {
      type: Date,
      default: Date.now
    },
    level: {
      type: Number,
      required: true
    }
  }]
});

// User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
  },
  image: String,
  role: {
    type: String,
    enum: ['candidate', 'employer', 'admin'],
    default: 'candidate'
  },
  skills: [SkillSchema],
  company: {
    type: String,
    required: function() {
      return this.role === 'employer';
    }
  },
  position: String,
  bio: String,
  githubUrl: String,
  linkedinUrl: String,
  lastActive: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Don't recreate the model if it already exists
const User = models.User || model('User', UserSchema);

export default User; 