import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Open Graph Tags */}
          <meta
            property="og:title"
            content="Content-AI: AI-powered content and image generator"
          />
          <meta
            property="og:description"
            content="Web application that utilises Open AI’s GPT-3.5-turbo API and more."
          />

          <meta
            property="og:image"
            content="https://res.cloudinary.com/drbz4rq7y/image/upload/v1694623717/imageurl2_zvug5e.jpg"
          />
          <meta
            property="og:url"
            content="https://content-ai-brown.vercel.app"
          />

          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Content-AI: AI-powered content and image generator"
          />
          <meta
            name="twitter:description"
            content="Web application that utilises Open AI’s GPT-3.5-turbo API and more."
          />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/drbz4rq7y/image/upload/v1694623717/imageurl2_zvug5e.jpg"
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
