import mongoose, { Schema, model, models } from 'mongoose';
import { env } from './env';

type UserRole = 'admin' | 'issuer';

const uri = env.MONGODB_URI;

export const connectDB = async () => {
  if (!uri) return false;
  if (mongoose.connection.readyState === 1) return true;
  await mongoose.connect(uri);
  return true;
};

const UserSchema = new Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['admin', 'issuer'], default: 'issuer' },
  approved: { type: Boolean, default: false },
});

const TemplateSchema = new Schema({
  name: String,
  data: Buffer,
  mime: String,
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
});

const CertificateSchema = new Schema({
  fields: Schema.Types.Mixed,
  issuerEmail: String,
  templateId: Schema.Types.ObjectId,
  pptxData: Buffer,
  hash: String,
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model('User', UserSchema);
export const Template = models.Template || model('Template', TemplateSchema);
export const Certificate = models.Certificate || model('Certificate', CertificateSchema);

export const memory = {
  users: new Map<string, any>(),
  templates: new Map<string, any>(),
  certificates: new Map<string, any>(),
};
