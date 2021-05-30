import React, { useEffect, useState } from 'react';
import { CircularProgress, MenuList, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch  } from 'react-redux';


import {
  loafFilmListAsync,
  selectFilmList,
  selectFilmListStatus,
} from './slices/filmListSlice';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 5, 

  },
});



export function FilmList(props) {

  const dispatch = useDispatch();
  const films = useSelector(selectFilmList);
  const status = useSelector(selectFilmListStatus);
  const [selectItem, setSelectItem] = useState(null);

  useEffect( () => {
    dispatch(loafFilmListAsync());
  }, [dispatch]);

  const classes = useStyles();

  const clickHandler = (inx, url) => {
    setSelectItem(inx);
    props.onChangeFilm(url);
  }


  const listItems = (status==='idle') ? films.map( (item, inx) =>
  (<MenuItem onClick={(e) => clickHandler(inx,item.url) } key={inx} selected={selectItem===inx} >{item.title}</MenuItem>)) : (<CircularProgress />);

  return (
      <MenuList className={classes.root}>
        {listItems}
      </MenuList>    
  );
}
