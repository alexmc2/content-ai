export default withApiAuthRequired(async function getImages(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { user } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db('Content-AI');

    // Fetch the user's profile from the database
    const userProfile = await db.collection('users').findOne({
      auth0Id: user.sub,
    });

    // Extract the lastImageDate and getNewerImages from the request body
    const { lastImageDate, getNewerImages } = req.body;

    // Fetch images related to the authenticated user from the database
    const images = await db
      .collection('images')
      .find({
        userId: userProfile._id,
        created: { [getNewerImages ? '$gt' : '$lt']: new Date(lastImageDate) },
      })
      .sort({ created: -1 }) // Sort by creation date in descending order
      .limit(getNewerImages ? 0 : 10)
      .toArray();

    res.status(200).json(images);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
