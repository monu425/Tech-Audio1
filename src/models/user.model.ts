import bcrypt from "bcryptjs";
import mongoose, { model, models, Schema, Types } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: "user" | "admin";
    isEmailVerified: boolean;
    emailVerification?: {
        token?: string;
        expiresAt?: Date;
    };
    isPhoneVerified: boolean;
    phoneVerification?: {
        otp?: string;
        expiresAt?: Date;
    };
    passwordReset?: {
        token?: string;
        expiresAt?: Date;
    };
    loginAttempts: number;
    isBlocked: boolean;
    lastLoginAt?: Date;
    profile?: IProfile;
    addresses: IAddress[];
    wishlist: Types.ObjectId[];
    settings: {
        notifications: boolean;
    };
    refreshTokens: IRefreshToken[];
    createdAt: Date
    updatedAt: Date;
}

/* =========================
   PROFILE INTERFACE
========================= */

export interface IProfile {
    avatar?: { url: string; public_id: string; };
    gender?: "male" | "female" | "other";
    dob?: Date;
}


/* =========================
   ADDRESS INTERFACE
========================= */

export interface IAddress {
    _id?: Types.ObjectId;
    type: "home" | "office" | "other";
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    isDefault: boolean;
}

/* =========================
   REFRESH TOKEN INTERFACE
========================= */

export interface IRefreshToken {
    token: string;
    device?: string;
    createdAt?: Date;
}





// Schema started


/* =========================
   ADDRESS SCHEMA
========================= */

const AddressSchema = new Schema<IAddress>(
    {
        type: { type: String, enum: ["home", "office", "other"], default: "home", },
        fullName: { type: String, required: true, trim: true, },
        phone: { type: String, required: true, },
        addressLine1: { type: String, required: true, },
        addressLine2: { type: String, default: "", },
        city: { type: String, required: true, },
        state: { type: String, required: true, },
        country: { type: String, default: "India", },
        pincode: { type: String, required: true, },
        isDefault: { type: Boolean, default: false, },
    }, { _id: true, }
);


/* =========================
   REFRESH TOKEN SCHEMA
========================= */

const RefreshTokenSchema = new Schema<IRefreshToken>(
    {
        token: { type: String, required: true, },
        device: { type: String, default: "unknown", },
        createdAt: { type: Date, default: Date.now, },
    }, { _id: false, }
);



/* =========================
   USER SCHEMA
========================= */

const UserSchema = new Schema<IUser>(
    {
        // BASIC INFO
        name: { type: String, required: true, trim: true, },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true, },
        phone: { type: String, unique: true, sparse: true, },

        // AUTH
        password: { type: String, required: true, minlength: 6, select: false, },
        role: { type: String, enum: ["user", "admin"], default: "user", },

        // EMAIL VERIFY
        isEmailVerified: { type: Boolean, default: false, },
        emailVerification: { token: String, expiresAt: Date, },

        // PHONE VERIFY
        isPhoneVerified: { type: Boolean, default: false, },

        phoneVerification: { otp: String, expiresAt: Date, },

        // PASSWORD RESET
        passwordReset: { token: String, expiresAt: Date, },

        // LOGIN SECURITY
        loginAttempts: { type: Number, default: 0, },
        isBlocked: { type: Boolean, default: false, },
        lastLoginAt: { type: Date, },

        // PROFILE
        profile: {
            avatar: { type: String, default: "",},
            gender: { type: String, enum: ["male", "female", "other"],},
            dob: Date,
        },

        // ADDRESSES
        addresses: [AddressSchema],

        // WISHLIST
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],

        // SETTINGS
        settings: {
            notifications: {
                type: Boolean,
                default: true,
            },
        },

        // REFRESH TOKENS
        refreshTokens: [RefreshTokenSchema],
    }, { timestamps: true, }
);

// Hash password before save
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    console.log(this.password)
    this.password = await bcrypt.hash(this.password, 12);
});


// Compare password
UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.password);
};


/* =========================
   INDEXES
========================= */

UserSchema.index({ email: 1 });

UserSchema.index({ phone: 1 });



/* =========================
   EXPORT MODEL
========================= */

const User =(models.User as mongoose.Model<IUser>) || model<IUser>("User", UserSchema);

export default User;