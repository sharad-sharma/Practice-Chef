import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ContestNav from '../components/ContestNav';
import ContestTable from './ContestTable';

const useStyles = makeStyles((theme) => ({
  progress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // marginBottom: theme.spacing(2),
  },
  root: {
    backgroundColor: '#f5f5f5',
  }
}));

const Contest = () => {
  const classes = useStyles();
  const [isAuth, setisAuth] = useState(true);
  const [username, setUsername] = useState('');
  const [allLongChallenge, setAllLongChallenge] = useState([]);
  const [contest_type, setContest_type] = useState("Long Challenge Division 1");
  const [attempted, setAttempted] = useState({});
  const [partiallySolved, setPartiallySolved] = useState({});
  const [solved, setSolved] = useState({});

  useEffect(() => {
    // console.log('here me')
    setisAuth(true);    // It should be true intially otherwise it will never open
    axios
    .get('https://practicechef.herokuapp.com/auth/isAuthenticated', {withCredentials: true})
    .then(res => {
      //console.log(res, "contest.js");
      if(res.data === "NO") {
        //console.log("Not logged in -Contest");
        setisAuth(false);
        //return <Redirect to='/login'  />
      } else {
        setisAuth(true);
        setUsername(res.data);
      }
    })
    .catch(err => console.log(err));
  
    
  }, [])

  useEffect(() => {
    if(!username) {
      //console.log("discard");
    } else {
      //console.log('Username: ', username);
      axios
        .get('https://practicechef.herokuapp.com/profile/fetchContests', {withCredentials: true})
        .then(res => {
          if(Array.isArray(res.data)) setAllLongChallenge(res.data);
          // console.log(allLongChallenge);
        })
        .catch(err => console.log(err));

      //console.log("fetchContests finished");
      axios
        .get('https://practicechef.herokuapp.com/profile/fetchSubmissions', {withCredentials: true})
        .then(res => {
          // console.log(res.data);
          let dict_atm = {};
          let dict_ac = {};
          let dict_pa = {};

          // load attempted problem codes
          for(const category in res.data.attempted) {
            const name_list = res.data.attempted[category];
            name_list.forEach(name => {
              dict_atm[name] = name;
            })
          }
          // load accepted problem codes
          for(const category in res.data.solved) {
            const name_list = res.data.solved[category];
            name_list.forEach(name => {
              dict_ac[name] = name;
            })
          }
          // load partiallySolved problem codes
          for(const category in res.data.partiallySolved) {
            const name_list = res.data.partiallySolved[category];
            name_list.forEach(name => {
              dict_pa[name] = name;
            })
          }
          setAttempted(dict_atm);
          setPartiallySolved(dict_pa);
          setSolved(dict_ac);

        })
        .catch(err => console.log(err));
    }
    
  }, [username])

  const changeContest_type = (type) => {
    setContest_type(type);
  }

  return (
    <div>
      {!isAuth ? <Redirect to='/login'/> : null}
      {!username ?
        <div className={classes.progress}>
          <CircularProgress />
          <Typography>Connecting to Server ...</Typography>
        </div> 
        :
        <div className={classes.root}>
          {/* Contest List */}
          <ContestNav changeContest_type={changeContest_type} />
          <ContestTable contest_type={contest_type} allLongChallenge={allLongChallenge} attempted={attempted} solved={solved} partiallySolved={partiallySolved} />
        </div>
      }
    </div>
  )
}

export default Contest
