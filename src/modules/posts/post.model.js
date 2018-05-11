import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import uniqueValidator from 'mongoose-unique-validator';

const PostSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required!'],
      minLength: [3, 'Title need to be longer!'],
      unique: true,
    },
    text: {
      type: String,
      trim: true,
      reqiured: [true, 'Text is required!'],
      minLength: [10, 'Text need to be longer'],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    favouriteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

PostSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

PostSchema.pre('save', function(next) {
  // methods are activated when saving happen (post/patch)
  this._slugify();
  next();
});

PostSchema.methods = {
  _slugify() {
    this.slug = slug(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      text: this.text,
      createdAt: this.createdAt,
      slug: this.slug,
      user: this.user,
      favouriteCount: this.favouriteCount,
    };
  },
};

PostSchema.statics = {
  createPost(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
  list({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdAt: -1 }) // get posts by last added
      .skip(skip || 0) // skip the first five posts
      .limit(limit || 0) // get only the first five posts
      .populate('user');
  },
  incFavourite(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favouriteCount: 1 } });
  },
  decFavourite(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favouriteCount: -1 } });
  },
};

export default mongoose.model('Post', PostSchema);
