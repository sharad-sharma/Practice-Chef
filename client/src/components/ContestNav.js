import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  butn: {
    display: 'flex',
    flexDirection: 'column',
    padding: 4,
    alignItems: "center",
  },
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
      color: theme.palette.warning
    },
  },
}));

function ContestNav({ changeContest_type }) {
  const classes = useStyles();
  
  return (
    <div className={classes.butn}>
      <div className={classes.root}>
        <Button variant="contained" color="secondary" onClick={() => changeContest_type('Long Challenge Division 1')} >Division 1</Button>
        <Button variant="contained" color="primary" onClick={() => changeContest_type('Long Challenge Division 2')}>Division 2</Button>
        <Button variant="contained" color="primary" onClick={() => changeContest_type('Long Challenge Division 3')} >Division 3</Button>
        <Button variant="contained" color="primary" onClick={() => changeContest_type('Long Challenge')} >Combined</Button>
        
      </div>
    </div>
  )
}

export default ContestNav