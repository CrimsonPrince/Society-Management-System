import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Grid from '@material-ui/core/Grid';


const Pokemon = props => (
  <Link href="/p/[id]" as={`/p/${props.id}`}>
  <div className="pokemon-card">
  <span> {props.name} </span>
  <style jsx>{`
        .pokemon-card {
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url(${props.imageurl}) , linear-gradient(to left, ${props.color[0]} 50%, ${props.color} 50%);
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
  <Grid container spacing={1}>
      {props.pokemons.map(pokemon => (
        <Grid item xs={2}>
        <Pokemon name={pokemon.name} id={pokemon.id} imageurl={pokemon.imageurl} color={pokemon.color}/>
        </Grid>
      ))}
      </Grid>
  </div>
  <style jsx>{`
        .pokemon-list { flex-grow: 1; }
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
