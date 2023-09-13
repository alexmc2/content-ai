import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Open Graph Tags */}
          <meta
            property="og:title"
            content="Vertex-AI: AI-powered content and image generator"
          />
          <meta
            property="og:description"
            content="Web application that utilises Open AI’s GPT-3.5-turbo API and more."
          />
          <meta
            property="og:image"
            content="https://asset.cloudinary.com/drbz4rq7y/27c0e3319a01b5ade2b01c0c5f8d4ea0"
          />
          <meta
            property="og:url"
            content="https://content-ai-brown.vercel.app"
          />

          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Vertex-AI: AI-powered content and image generator"
          />
          <meta
            name="twitter:description"
            content="Web application that utilises Open AI’s GPT-3.5-turbo API and more."
          />
          <meta
            name="twitter:image"
            content="https://asset.cloudinary.com/drbz4rq7y/27c0e3319a01b5ade2b01c0c5f8d4ea0"
          />
          {/* ... other head elements */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
