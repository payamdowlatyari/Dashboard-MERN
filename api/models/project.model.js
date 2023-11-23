import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    status: {
      type: Number,
      required: true,
      default: 0
    },
    startDate: {
      type: Date,
      default: new Date()
    },
    endDate: {
      type: Date,
      default: new Date()
    },
    link:String,
    ownerId: [{
      type: Schema.Types.ObjectId,
      ref: 'Client'
    }],
    comments: [
      {
        by: {
          type: Schema.Types.ObjectId,
          ref: "Client",
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: new Date()
        },
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;