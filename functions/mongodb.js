const { MongoClient } = require('mongodb');
const functions = require('firebase-functions');

const uri = functions.config().mongodb.uri;

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

module.exports = clientPromise;
