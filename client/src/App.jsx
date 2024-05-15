import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Clients } from './components/Clients'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        clients:{
          merge(existing, incoming){
            return incoming;
          }
        }
      }
    }
  }
})
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});


function App() {

  return (
    <>
    <ApolloProvider client = {client}>
      <Header/>
      <h1>Hello World</h1>
      <Clients/>
    </ApolloProvider>
    </>
  )
}

export default App
