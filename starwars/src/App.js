import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { FilmList } from './features/film/FilmList';
import { FilmInfo } from './features/film/FilmInfo';
import { Review } from './features/film/Review';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [review, writeReview] = useState(false);
  const [snack, showSnack] = useState(false);

  const handleSave = (data) => {
    writeReview(false);

    const sender = new Promise( (resolve) => { setTimeout( resolve, 1000,  data) });

    sender.then((value) => {
      showSnack(true);
      console.log(value);
    });

  }

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
          <Grid item xs={10}><FilmInfo film={film} onWriteReview={ f => { writeReview(f);} } /></Grid>
        </Grid>
      </div>
      <Review open={review} onClose={ ()=> { writeReview(false); } } onSave={handleSave} />
      <Snackbar open={snack} autoHideDuration={6000} onClose={() => { showSnack(false); }}>
        <Alert onClose={() => { showSnack(false); }} severity="success">
          Данные успешно отправлены на сервер. Эхо данных в консоли!
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
