import React, { Suspense, useEffect, useState } from 'react';
import { Dialog, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch  } from 'react-redux';

import {
  saveReviewAsync,
  selectReview,
  selectReviewStatus,
} from './slices/reviewSlice';

const FormReview = React.lazy(() => import('./FormReview'));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 5, 

  },
});


export function Review(props) {

  const [snack, showSnack] = useState(false);

  const dispatch = useDispatch();
  const review = useSelector(selectReview);
  const status = useSelector(selectReviewStatus);

    const handleSave = (data) => {
    props.onClose();
    dispatch(saveReviewAsync( {film: props.film, data: data} ))
      .then(() => { showSnack(true); console.log(review); });
  }

  const classes = useStyles();

  return (
    <>
      <Dialog
          className={classes.root}
          open={props.open}
          onClose={props.onClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
      >
          <Suspense fallback={<div>Загрузка...</div>}> 
              <FormReview onClose={props.onClose} onSave={handleSave}  />            
          </Suspense> 
      </Dialog> 
      <Snackbar open={snack} autoHideDuration={6000} onClose={() => { showSnack(false); }}>
        <Alert onClose={() => { showSnack(false); }} severity="success">
          Данные успешно отправлены на сервер. Эхо данных в консоли!
        </Alert>
      </Snackbar>
    </>
  );

}
