import HTTPStatus from 'http-status';
import Post from './post.model';

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
    const post = await Post.findById(req.params.id).populate('user');
    return res.status(HTTPStatus.OK).json(post);
  } catch (e) {
    res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getPostsList(req, res) {
  try {
    const posts = await Post.list({ limit: parseInt(req.query.limit, 0), skip: parseInt(req.query.skip, 0) });
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
    Object.keys(req.body).forEach(key => { // get the keys from the object ['title', 'text']
      post[key] = req.body[key];
    });
    return res.status(HTTPStatus.OK).json(await post.save());
  } catch (e) {
    res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
