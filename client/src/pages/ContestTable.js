import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import ContestElement from "../components/ContestElement";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  typo: {
    '& > * + *': {
      marginLeft: theme.spacing(0.5),
    },
    fontSize: 15,
  },
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    // borderWidth: 1, borderColor: 'gray',borderStyle: 'solid',
    minWidth: 650,
  },
  accepted: {
    backgroundColor: '#d4edc9',
  },
  Contest_colm: {
    backgroundColor: '#fafafa',
  },
  bold: {
    fontWeight: 580,
    width: 120,
  },
  
}));
const indexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

function ContestTable({ contest_type, allLongChallenge, attempted, solved, partiallySolved }) {
  const classes = useStyles();
  const[ctype, setCtype] = useState("Division 1")
  // console.log('hitted')

  useEffect(() => {
    if(contest_type.includes("Division 2")) {
      setCtype("Division 2");
    } else if(contest_type.includes("Division 3")) {
      setCtype("Division 3");
    } else if(contest_type.includes("Division 1")) {
      setCtype("Division 1");
    } else {
      setCtype("Combined")
    }
  }, [contest_type])

  let Showcontent = allLongChallenge.length > 0?allLongChallenge.map((row_val) => {
    // contest should match with specified type
    if(ctype !== "Combined" && !row_val.name.includes(ctype)) return ; // newer rounds
    if(ctype === "Combined" && (row_val.name.includes("Division") || row_val.name.includes("DIV"))) return ; // old rounds
    if(ctype === "Combined" && (row_val.code === "DECI2020" || row_val.code === "DECO2020")) return ;
    if(row_val.problemsList.length < 6) return ;   // probably it is not long challenge

    if(row_val.problemsList.length === 0) return ;
    else return (
      <TableRow key={row_val.code}>
        <TableCell className={classes.Contest_colm} align="left" component="th" scope="row">
          <Typography className={classes.typo}>
            <Link color="inherit" target="_blank" rel="noopener" href={`https://www.codechef.com/${row_val.code}`}>
              {row_val.code.slice(0, 25)}
            </Link>
          </Typography>
        </TableCell>
        {
          row_val.problemsList.sort((a, b) => b.successfulSubmissions - a.successfulSubmissions).map(val => {
            // if(val.contestCode !== row_val.code) return;   // this problem doesn't belong to this division
            let problem_name = val.problemCode;
            let problemId = val.contestCode + "/problems/" + val.problemCode;
            let attempt_status = "nothing";
            if(attempted[problem_name]) attempt_status = "red";
            if(solved[problem_name]) attempt_status = "green";
            if(partiallySolved[problem_name]) attempt_status = "yellow";
            return(
              <ContestElement key={val.problemCode} val={val} problem_name={problem_name} attempt_status={attempt_status} problemId={problemId} accuracy={val.accuracy} successfulSubmissions={val.successfulSubmissions} />
            )
          })
        }
      </TableRow>
    
    )
  }):<TableRow><TableCell align="left"></TableCell></TableRow>

  return (
    <div>
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
        <Typography variant="h4" gutterBottom>{contest_type}</Typography>
          <TableContainer component={Paper} className="root">
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className={classes.problem_colm}> <Typography className={classes.bold} >Contest</Typography></TableCell>
                  {/* <TableCell align="left">H</TableCell> */}
                  {indexes.map((indexx) => (
                    <TableCell key={indexx} align="left"> <Typography className={classes.bold} >{indexx}</Typography> </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Showcontent}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default ContestTable;