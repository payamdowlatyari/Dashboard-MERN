import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    accessLevel : {
        type: Number,
        default: 2
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;