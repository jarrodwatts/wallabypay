import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="description"
        content="Wallaby Pay - Send cryptocurrency to one another with ease."
      />
      <meta
        name="keywords"
        content="Wallaby Pay, cryptocurrency, send cryptocurrency, digital payments"
      />
      <meta name="author" content="Jarrod Watts" />
      <meta name="og:title" content="Wallaby Pay" />
      <meta
        name="og:description"
        content="A secure and user-friendly app for sending cryptocurrency."
      />
      <meta name="og:type" content="website" />
      <meta name="og:url" content="https://www.wallabypay.com"></meta>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
