import mongoose from "mongoose";

const authSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    userRole: {
      type: String,
      default: "User",
      enum: ["User", "Bussiness", "Blogger"],
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: ''
    },
    provider: {
      type: String,
      default: "google",
    },
  },
  { timestamps: true }
);

// Indexes
authSchema.index({ googleId: 1 });
authSchema.index({ email: 1 });

// Pre-save hook for debugging
authSchema.pre('save', function(next) {
  console.log('💾 Saving user:', this.email);
  next();
});

authSchema.post('save', function(doc) {
  console.log('✅ User saved to DB:', doc._id);
});

authSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    console.error('❌ Duplicate key error:', error.keyValue);
    next(new Error('Email or Google ID already exists'));
  } else {
    next(error);
  }
});

const authUser = mongoose.model("usersofbharatOauth", authSchema);

export default authUser;
