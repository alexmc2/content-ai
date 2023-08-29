// pages/api/session.js
import { getSession } from '@auth0/nextjs-auth0';

export default async function session(req, res) {
  const session = await getSession(req, res);
  console.log(session);
  res.json(session);
}
