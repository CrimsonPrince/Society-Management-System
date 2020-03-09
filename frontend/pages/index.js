import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const types = [
  {
    "name" : "normal",
    "color": "#002bb8"
  },
  {
    "name": "fighting",
    "color" : "#C03028" 
  },
  {
    "name" : "flying",
    "color" : "#A890F0"
  },
  {
  "name" : "poison",
  "color" : "#A040A0"
  },
  {
  "name" : "ground",
  "color": "#E0C068"
  },
  {
  "name" : "rock",
  "color" : "#B8A038"
  },
  {
  "name" : "bug",
  "color" : "#A8B820" 
  },
  {
    "name" : "ghost",
    "color" : "#705898"
  },
  {
    "name": "steel",
    "color" : "#B8B8D0"
  },
  {
    "name" : "fire",
    "color" : "#F08030"
  },
  {
    "name" : "water",
    "color" : "#6890F0"
  },
  {
    "name" : "grass",
    "color" : "#78C850"
  },
  {
    "name" : "electric",
    "color" : "#F8D030"
  },
  {
    "name" : "psychic",
    "color" : "#F85888"
  },
  {
    "name" : "ice",
    "color" : "#98D8D8"
  },
  {
    "name" : "dragon",
    "color" : "#7038F8"
  },
  {
    "name" : "dark",
    "color" : "#705848"
  },
  {
    "name" : "fairy",
    "color" : "#EE99AC"
  }
]
const Pokemon = props => (
  <Link href="/p/[id]" as={`/p/${props.id}`}>
  <div className="pokemon-card">
  <span> {props.name} </span>
  <style jsx>{`
        .pokemon-card {
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url(${props.imageurl}) , linear-gradient(to right, red 50%, green 50%);
          height: 160px;
          width: 160px; 
          margin: 10px;
          position: relative;
          overflow: hidden;
          }

          .pokemon-card span {
            color: #fff;
            font-size: 14px;
            background-color: rgba(0,0,0,.5);
            left: 0;
            right: 0;
            z-index: 20;
            text-align: center;
            pointer-events: none;
            position: absolute;
            bottom: 0;
           }
      `}</style>
</div>
 </Link>
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
  data.map(pokemon => { pokemon.color = pokemon.typeofpokemon.filter(e => types.includes(e.name)) })
  console.log(data)
  return {
    pokemons: data
  };
};

export default Index;
