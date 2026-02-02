import { Subscriber } from '../models/subscriber.model';
import connectDB from '../db/connect';

export const getAllSubscribers = async () => {
  await connectDB();
  return await Subscriber.find().sort({ createdAt: -1 });
};

export const createSubscriber = async (data: { email: string; name?: string }) => {
  await connectDB();
  const existing = await Subscriber.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    if (existing.status === 'inactive') {
      existing.status = 'active';
      return await existing.save();
    }
    return existing;
  }
  return await Subscriber.create({
    email: data.email.toLowerCase(),
    name: data.name
  });
};

export const deleteSubscriber = async (id: string) => {
  await connectDB();
  return await Subscriber.findByIdAndDelete(id);
};
