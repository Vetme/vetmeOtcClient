import gql from "graphql-tag";
// import { HttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  }),
  cache: new InMemoryCache(),
});

export const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`;

export const ETH_PRICE_QUERY = gql`
  query ethPrice {
    bundle(id: "1") {
      ethPrice
    }
  }
`;

export const ETH_TOKEN_QUERY = gql`
  {
    pairs {
      id
      token1 {
        id
        symbol
        name
        totalSupply
      }
    }
  }
`;
