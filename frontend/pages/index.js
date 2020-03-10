import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const Pokemon = props => (
  <Link href="/p/[id]" as={`/p/${props.id}`}>
  <div className="pokemon-card">
  <span> {props.name} </span>
  <style jsx>{`
        .pokemon-card {
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url(${props.imageurl}) , linear-gradient(to left, ${props.color[0]} 50%, ${props.color} 50%);
          max-width: 160px;
          max-height: 160px;
          min-height: 160px;
          min-width: 160px;
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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  tile: {
    height: '150',
    width: '150',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function Index(props) {
  const classes = useStyles();
  return (
  <Layout>
  {/* <GridList cellHeight={160} cols={3}>
      {props.pokemons.map(pokemon => (
        <GridListTile cols={1}>
        <Pokemon name={pokemon.name} id={pokemon.id} imageurl={pokemon.imageurl} color={pokemon.color}/>
        </GridListTile>
      ))}
      </GridList> */}

      <GridList cellHeight={160} cellWidth={160} className={classes.gridList}>
        {props.pokemons.map(pokemon => (
          <GridListTile  cellHeight={160} cellWidth={160} key={pokemon.imageurl}>
            <img src={pokemon.imageurl} alt={pokemon.name} />
            <GridListTileBar
              title={pokemon.name}
              actionIcon={
                <IconButton aria-label={`info about ${pokemon.name}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
  </Layout>
  );
}

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3001/pokemon');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);
  return {
    pokemons: data
  };
};