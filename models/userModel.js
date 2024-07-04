import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,

    },
    password: {
        type: String,
        required: [true, 'Password is required']

    },
    searchKeywords: {
        type: [String],
        default: []
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });
  
  // Method to compare password
  userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = mongoose.model('User', userSchema);
  
  export default User;