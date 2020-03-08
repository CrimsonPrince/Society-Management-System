import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Pokemon = props => (
  <div className="pokemon-card">
  <Link href="/p/[id]" as={`/p/${props.id}`}>
    <img src={props.imageurl}   />
  </Link>
</div>
);

const Index = props => (
  <Layout>
  <div id="pokemon-list">
      {props.pokemons.map(pokemon => (
        <Pokemon name={pokemon.name} id={pokemon.id} imageurl={pokemon.imageurl}/>
      ))}
  </div>
  <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }

        #pokemon-list {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .pokemon-card {
          background-size: contain;
          background-repeat: no-repeat;
          height: 160px;
          width: 160px; 
          margin: 10px;
          position: relative;
          overflow: hidden;
          }
      `}</style>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3001/pokemon');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    pokemons: data
  };
};

export default Index;
