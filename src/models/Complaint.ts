import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaint extends Document {
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  dateSubmitted: Date;
  userId?: string;
  userName?: string;
  userEmail?: string;
}

const ComplaintSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a complaint title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a complaint description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Product', 'Service', 'Support'],
  },
  priority: {
    type: String,
    required: [true, 'Please select a priority'],
    enum: ['Low', 'Medium', 'High'],
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'In Progress', 'Resolved'],
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    ref: 'User',
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
});

export default mongoose.models.Complaint || mongoose.model<IComplaint>('Complaint', ComplaintSchema);
