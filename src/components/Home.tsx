import { AuthOptions, createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

import appSyncConfig from "../configs/aws-exports";
import ListToDos from "./ListToDos";
import { Auth } from "aws-amplify";
import { getJWTToken, isLoggedIn } from "../services/AuthService";
import { useEffect } from "react";
import { Navigate, redirect } from "react-router-dom";
import { createTheme } from "@mui/material";

const theme = createTheme();

const Home = () => {
    redirect("/login")
    useEffect(() => {
        
        const handleRedirect = async () => {
            let loggedIn = await isLoggedIn()
            console.log(loggedIn)
            
        }
        handleRedirect()
    }, [])
    const url = appSyncConfig.aws_appsync_graphqlEndpoint;
    const region = appSyncConfig.aws_appsync_region;

    const auth: AuthOptions = {
    type: "AMAZON_COGNITO_USER_POOLS",
    jwtToken: async () => await getJWTToken(), // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
    // credentials: async () => credentials, // Required when you use IAM-based auth.
    };

    const httpLink = new HttpLink({ uri: url });

    const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
    ]);

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <ListToDos/>
        </ApolloProvider>
    )
}

export default Home;