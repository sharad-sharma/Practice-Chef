import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import { Button } from "@material-ui/core";
import HomePage from "../photos/HomePage.png";
import Easy_Login from "../photos/Easy_Login.png";
import productCurvyLines from "../photos/productCurvyLines.png";

//import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Button, Link as Link2 } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        PracticeChef
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // backgroundImage: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    marginTop: theme.spacing(4),
    backgroundImage: 'url('+ productCurvyLines+')',
    backgroundColor: "#fff5f8",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#f6f6f6",
    padding: theme.spacing(6),
  },
  starter: {
    backgroundColor: theme.palette.background.starter,
    padding: theme.spacing(6),
  },
  heart: {
    color: "red",
  },
  centerme: {
    align: "center",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [isAuth, setisAuth] = useState(false);

  useEffect(() => {
    // console.log('here me')
    axios
      .get("http://localhost:5000/auth/isAuthenticated", {
        withCredentials: true,
      })
      .then((res) => {
        //console.log(res);
        if (res.data === "NO") {
          //console.log("Not logged in -Login");
          setisAuth(false);
        } else {
          setisAuth(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {isAuth ? <Redirect to="/" /> : null}
      
      <main>
        {/* Hero unit */}
        <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '80vh' }}
        >

            <Container maxWidth="sm">
              {/* <div align="center">
                <img style={{maxWidth: 150}} src='./LogoMy.png' alt="Logo" />
              </div> */}
            
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Practice Chef
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Sharpen your skills by practicing one of the best problemset.
                Here you can access all the long challenges in a tabular manner.
                #LongChallengesAreTheBest
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" size="large" href="http://localhost:5000/auth/loginwithcodechef">
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>

        </Grid> 
        </div>
        
        <div className={classes.heroContent}>
          <Typography style={{align: "center"}} component="h1" variant="h3" align="center"    color="textPrimary" gutterBottom>
            Why PracticeChef ?
          </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          
          <Typography style={{textAlign: "center", paddingBottom: 20}} component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
            All Challanges in One Place
          </Typography>
          <Grid style={{paddingBottom: 50}}   container spacing={8}>
              <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={HomePage}
                    title="Image title"
                  />
                </Card>
              </Grid>
            
          </Grid>
          <Typography style={{paddingBottom: 20}}  component="h1" variant="h4" align="center"    color="textPrimary" gutterBottom>
            Easy Login
          </Typography>
          <Grid style={{paddingBottom: 50}}  container spacing={8}>
              <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    //image="https://source.unsplash.com/random"
                    // image = "https://as1.ftcdn.net/jpg/02/48/02/40/500_F_248024023_9xgb7cqNiRsGL3pwxYSOexnlX3FALuEL.jpg"
                    image={Easy_Login}
                    title="Image title"
                  />
                </Card>
              </Grid>
            
          </Grid>
        </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Practice Chef
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        made with <span className={classes.heart}>❤</span> by <Link2 style={{color: "#ffbf00", fontWeight: 600}} href="https://www.codechef.com/users/codedontlie"> sharad sharma</Link2>
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </div>
  );
};

export default Login;
