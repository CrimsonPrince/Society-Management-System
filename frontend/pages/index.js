import Layout from '../components/MyLayout';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
    "align-items": "center",
    "justify-content": "center",
  },
  gridTile: {
    height: 180,
    width: 180,
    margin: 5,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function Index(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {props.pokemons.map(pokemon => (
          <Link href="/p/[id]" as={`/p/${pokemon.id}`}>
          <GridListTile className={classes.gridTile} key={pokemon.imageurl}>
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
          </Link>
        ))}
      </GridList>
    </div>
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