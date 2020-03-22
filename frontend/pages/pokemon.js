import fetch from 'isomorphic-unfetch';
import { GridList, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';

export default function index(props) {
    return (
      <div>
        <GridList>
          {props.pokemons.map(pokemon => (
            <GridListTile key={pokemon.imageurl}>
              <img src={pokemon.imageurl} alt={pokemon.name} />
              <GridListTileBar
                title={pokemon.name}
                actionIcon={
                  <IconButton aria-label={`info about ${pokemon.name}`}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
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