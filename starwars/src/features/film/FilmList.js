import React, { useState, useEffect } from 'react';
import { CircularProgress, MenuList, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 5, 

  },
});



export function FilmList(props) {

  const [films, setFilms] = useState(null);
  useEffect(() => {
    fetch('https://swapi.dev/api/films/')
    .then(response => response.json() )
    .then(data => { 
      if (data && data.results) { setFilms(data.results); }
    });
  }, []);



  const classes = useStyles();

  const listItems = (films) ? films.map( (item, inx) =>
  (<MenuItem onClick={(e) => { props.onChangeFilm(item.url); } } key={inx} >{item.title}</MenuItem>)) : (<CircularProgress />);

  return (
      <MenuList className={classes.root}>
        {listItems}
      </MenuList>    
  );
}
