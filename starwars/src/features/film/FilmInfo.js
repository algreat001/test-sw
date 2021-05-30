import React, { useMemo } from 'react';
import { Grid, Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch  } from 'react-redux';

import {
    loafFilmInfoAsync,
    selectFilmInfo,
    selectFilmInfoStatus,
  } from './slices/filmInfoSlice';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 5, 

  },
  circus: {
      margin: 'auto'
  },
  logo: {
    height: 150,
    display: 'block',
    margin: 'auto'
  },
  write: {
    marginTop: 10
  }  
});

export function FilmInfo(props) {

  const dispatch = useDispatch();
  const filmInfo = useSelector(selectFilmInfo);
  const status = useSelector(selectFilmInfoStatus);

  const classes = useStyles();

  useMemo(() => {
    if (props.film) dispatch(loafFilmInfoAsync(props.film));
  }, [props.film, dispatch]);


  return (
        <Grid>
            {status==='idle' &&
                <>
                <Grid item>
                    <img alt='logo' src={filmInfo.logo} className={classes.logo} />
                </Grid>
                <Grid item>
                    <h2>{filmInfo.title}</h2>
                </Grid>
                <Grid item>
                    {filmInfo.info}
                </Grid>
                <Grid item>
                    <Button className={classes.write}  variant="contained" color="primary" onClick={() => { props.onWriteReview(true); } }>Написать рецензию</Button>
                </Grid>
                </>
            }
            {status==='loading' && 
            <>
                <Skeleton variant="text" width={210} />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={210} height={118} />
            </>}
        </Grid>
    );
}
