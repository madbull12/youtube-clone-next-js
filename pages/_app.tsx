import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/globals.css";
import TimeAgo from "javascript-time-ago";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import en from "javascript-time-ago/locale/en.json";
import AuthWrapper from "../components/AuthWrapper";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { isPlaylistDialogOpen } from "../atom/playlist";
import Sidebar from "../components/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { menuNavState } from "../atom/menuNav";
import Layout from "../components/Layout";

TimeAgo.addDefaultLocale(en);
// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>
          <RecoilRoot>
            <Toaster position="bottom-left" />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </AuthWrapper>
      </QueryClientProvider>
    </SessionProvider>
  );
}
