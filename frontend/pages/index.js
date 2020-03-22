import React from 'react';
import Layout from '../components/MyLayout';
import PokemonList from '../components/PokemonList'


export default function index(props) {

  return (
    <Layout> 
    <PokemonList pokemons={props.pokemons}> </PokemonList> 
    </Layout>
  );
}

index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3001/pokemon');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);
  return {
    pokemons: data
  };
}