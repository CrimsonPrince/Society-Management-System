import fetch from 'isomorphic-unfetch';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Link from 'next/link';

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
    "justify-content": "center",
    "background": "linear-gradient(to right, ${props.color[0]} 50%, ${props.color} 50%)",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function index(props) {
    const classes = useStyles();

    return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={4}>
        {props.pokemons.map(pokemon => (
          <Link href="/p/[id]" as={`/p/${pokemon.id}`}>
          <GridListTile style={{height: '180px', width: '180px', margin: "5px", background: `linear-gradient(to left, ${pokemon.color[0]} 50%, ${pokemon.color} 50%)` }} key={pokemon.imageurl}>
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

