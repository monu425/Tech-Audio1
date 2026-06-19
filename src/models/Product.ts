import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  images: string[];
  description?: string;
  price: number;
  discount?: number;
  categories: mongoose.Types.ObjectId[];
  stock: number;
  brand?: mongoose.Types.ObjectId;
  status: "new" | "hot" | "sale";
  variant: "gadget" | "appliances" | "refrigerators" | "others";
  isFeatured: boolean;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    fiveStars: number;
    fourStars: number;
    threeStars: number;
    twoStars: number;
    oneStars: number;
  };
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    images: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    stock: {
      type: Number,
      default: 0,
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },

    status: {
      type: String,
      enum: ["new", "hot", "sale"],
      default: "new",
    },

    variant: {
      type: String,
      enum: ["gadget", "appliances", "refrigerators", "others"],
      default: "gadget",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    ratingDistribution: {
      fiveStars: {
        type: Number,
        default: 0,
      },

      fourStars: {
        type: Number,
        default: 0,
      },

      threeStars: {
        type: Number,
        default: 0,
      },

      twoStars: {
        type: Number,
        default: 0,
      },

      oneStars: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);