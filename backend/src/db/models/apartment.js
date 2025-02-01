import { Schema, model } from 'mongoose';

const apartmentSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    rooms: { type: Number, required: true },
    photos: {
      type: [String],
      default:
        'https://png.pngtree.com/thumb_back/fw800/background/20230303/pngtree-room-interior-bedroom-cartoon-living-kids-with-furniture-teenage-bed-kid-vector-image_1757093.jpg',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const ApartmentCollection = model('apartment', apartmentSchema);
