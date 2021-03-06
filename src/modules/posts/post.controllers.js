import HTTPStatus from 'http-status';
import Post from './post.model';
import User from '../users/user.model';

export async function createPost(req, res) {
  try {
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (e) {
    res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getPostById(req, res) {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Post.findById(req.params.id).populate('user')
    ]);
    const favourite = promise[0]._favourites.isPostIsFavourite(req.params.id);
    const post = promise[1];
    return res.status(HTTPStatus.OK).json({
      ...post.toJSON(),
      favourite
    });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getPostsList(req, res) {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Post.list({
        limit: parseInt(req.query.limit, 0),
        skip: parseInt(req.query.skip, 0),
      })
    ]);
    const posts = promise[1].reduce((arr, post) => {
      const favourite = promise[0]._favourites.isPostIsFavourite(post._id);
      arr.push({
        ...post.toJSON(),
        favourite
      });
      return arr;
    }, [])

    return res.status(HTTPStatus.OK).json(posts);
  } catch (e) {
    res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updatePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    Object.keys(req.body).forEach(key => {
      // get the keys from the object ['title', 'text']
      post[key] = req.body[key];
    });
    return res.status(HTTPStatus.OK).json(await post.save());
  } catch (e) {
    res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    await post.remove(post);
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function favouritePost(req, res) {
  try {
    const user = await User.findById(req.user._id);
    await user._favourites.posts(req.params.id);
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
