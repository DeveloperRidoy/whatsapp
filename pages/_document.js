import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
        </Head>
        <body>
          <Main />
        </body>
        <NextScript />
        <script
          src="https://kit.fontawesome.com/c02801aade.js"
          crossOrigin="anonymous"
        ></script>
      </Html>
    );
  }
}

export default MyDocument;
