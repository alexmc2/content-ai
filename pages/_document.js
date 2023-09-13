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
            content="https://res.cloudinary.com/drbz4rq7y/image/upload/c_scale,h_1200,q_100,r_8,w_880/v1694618769/Screenshot_from_2023-09-13_16-24-33_fjjliv.png"
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
            content="https://res.cloudinary.com/drbz4rq7y/image/upload/c_scale,h_1200,q_100,r_8,w_880/v1694618769/Screenshot_from_2023-09-13_16-24-33_fjjliv.png"
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
