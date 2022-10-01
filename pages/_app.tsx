import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/globals.css"
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import AuthWrapper from "../components/AuthWrapper";
import { Toaster } from "react-hot-toast";

TimeAgo.addDefaultLocale(en)
// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
      
    >
      <AuthWrapper>
        <Toaster 
          position="bottom-left"
        />
        <Header />
        <Component {...pageProps} />
      </AuthWrapper>
     
    </SessionProvider>
  );
}
