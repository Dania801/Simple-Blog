import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { passwordReg } from './user.validation';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!'],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'User name is required!'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minLength: [6, 'Password needs to be longer!'],
    validator: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password!',
    },
  },
});

export default mongoose.model('User', UserSchema);
