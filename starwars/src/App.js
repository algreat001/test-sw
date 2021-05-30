import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { FilmList } from './features/film/FilmList';
import { FilmInfo } from './features/film/FilmInfo';
import { Review } from './features/film/Review';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    width: "90%", 
    margin: "auto"
  },
  header: {
    fontSize:"2rem",
    textAlign: 'center',
    verticalAlign: 'center',
    backgroundColor: '#eaeaea',
    height: "3rem"
  }, 
  review: {

  }
}));

function App() {
  const classes = useStyles();
  const [film, setFilm] = useState(null);
  const [review, writeReviewDlg] = useState(false);
 
  return (
    <>
      <div>
        <Grid   
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={1}
          className={classes.grid}
        >
          <Grid item xs={12}><div className={classes.header}>Тестовое задание</div></Grid>
          <Grid item xs={2}><FilmList onChangeFilm={ f => { setFilm(f);} }/></Grid>
          <Grid item xs={10}><FilmInfo film={film} onWriteReview={ f => { writeReviewDlg(f);} } /></Grid>
        </Grid>
      </div>
      <Review open={review} film={film} onClose={ ()=> { writeReviewDlg(false); } }  />
    </>
  );
}

export default App;
