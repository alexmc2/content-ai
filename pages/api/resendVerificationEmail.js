

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const userId = req.body.userId;

  // Obtain a Management API Token
  const tokenResponse = await fetch(
    'https://dev-f1rocshp7hzayk6t.us.auth0.com/oauth/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: 'https://dev-f1rocshp7hzayk6t.us.auth0.com/api/v2/',
        grant_type: 'client_credentials',
      }),
    }
  );

  const tokenData = await tokenResponse.json();
  const managementApiToken = tokenData.access_token;

  if (!managementApiToken) {
    return res
      .status(500)
      .json({ success: false, message: 'Error obtaining API token.' });
  }

  // Use the token to send a verification email
  try {
    const response = await fetch(
      'https://dev-f1rocshp7hzayk6t.us.auth0.com/api/v2/jobs/verification-email',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${managementApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      }
    );

    const data = await response.json();

    if (data && data.status === 'pending') {
      res
        .status(200)
        .json({ success: true, message: 'Verification email sent!' });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Error resending email.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error resending email.' });
  }
}
