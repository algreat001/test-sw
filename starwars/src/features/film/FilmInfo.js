import React, { useState, useMemo } from 'react';
import { Grid, Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';


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

  const [is_loading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [info, setInfo] = useState(null);
  const [header, setHeader] = useState(null);
  //const [url, setURL] = useState(null);

  useMemo(() => {
    if (props.film) setIsLoading(true);

    if (props.film)
        fetch(props.film)
        .then(response => response.json() )
        .then(data => { 
        if (data) { 
            setInfo(data.opening_crawl);  
            //в аpi нет лого и вообще ссылок на картинки
            setLogo('https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo.svg'); 
            setHeader(data.title);
            //setURL(data.url);
        }
        setIsLoading(false);
        });

  }, [props.film]);

  const classes = useStyles();

  return (
        <Grid>
            {!is_loading && logo &&
                <>
                <Grid item>
                    {logo && <img alt='logo' src={logo} className={classes.logo} />}
                </Grid>
                <Grid item>
                    <h2>{header}</h2>
                </Grid>
                <Grid item>
                    {info}
                </Grid>
                <Grid item>
                    <Button className={classes.write}  variant="contained" color="primary" onClick={() => { props.onWriteReview(true); } }>Написать рецензию</Button>
                </Grid>
                </>
            }
            {is_loading && 
            <>
                <Skeleton variant="text" width={210} />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={210} height={118} />
            </>}
        </Grid>
    );
}
