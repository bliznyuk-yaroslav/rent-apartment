import { Schema, model } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';
const apartmentSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    rooms: { type: Number, required: true },
    location: { type: String },
    floor: { type: Number },
    square: { type: Number },
    photo: {
      type: [String],
      default: ["https://example.com/default-image.jpg"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
apartmentSchema.post('save', mongooseSaveError);
apartmentSchema.pre('findOneAndUpdate', setUpdateSettings);
apartmentSchema.post('findOneAndUpdate', mongooseSaveError);
export const ApartmentCollection = model('apartment', apartmentSchema);
