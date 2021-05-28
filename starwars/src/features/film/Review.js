import React, { Suspense } from 'react';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const FormReview = React.lazy(() => import('./FormReview'));
//const FormReview = import('./FormReview');

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 5, 

  },
});

export function Review(props) {
    const classes = useStyles();

    return (
            <Dialog
                className={classes.root}
                open={props.open}
                onClose={props.onClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <Suspense fallback={<div>Загрузка...</div>}> 
                    <FormReview onClose={props.onClose} onSave={props.onSave}  />            
                </Suspense> 
            </Dialog> 
        );

}
