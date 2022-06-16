import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "lib/apollo-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "lib/supabase-client";
import { UserContext } from "lib/context";
import { handleAuthChange } from "helpers/handle-auth-change";

function MyApp({ Component, pageProps }: AppProps) {
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");

  const router = useRouter();

  const checkUser = async () => {
    const user = await supabase.auth.user();
    if (user) setAuthenticatedState("authenticated");
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
          router.push("/profile");
        }

        if (event == "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
        }
      }
    );

    checkUser();

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <UserContext.Provider value={authenticatedState}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
