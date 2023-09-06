import { getSession } from '@auth0/nextjs-auth0';
import clientPromise from '../lib/mongodb';

export const getAppProps = async (ctx) => {
  const userSession = await getSession(ctx.req, ctx.res);
  const client = await clientPromise;
  const db = client.db('Content-AI');
  const user = await db.collection('users').findOne({
    auth0Id: userSession.user.sub,
  });

  if (!user) {
    return {
      availableTokens: 0,
      posts: [],
      images: [],
    };
  }

  const posts = await db
    .collection('posts')
    .find({
      userId: user._id,
    })
    .limit(10)
    .sort({
      created: -1,
    })
    .toArray();

  // Fetch all images for the user

  const images = await db
    .collection('images')
    .find({
      userId: user._id,
    })
    .toArray();



  const serialisedImages = images.map(({ created, _id, userId, ...rest }) => ({
    _id: _id.toString(),
    created: created.toString(),
    ...rest,
  }));

  return {
    availableTokens: user.availableTokens,
    posts: posts.map(({ created, _id, userId, ...rest }) => ({
      _id: _id.toString(),
      created: created.toString(),
      ...rest,
    })),
    images: serialisedImages,
    postId: ctx.params?.postId || null,
  };
};
