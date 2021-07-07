import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import DifficultyCircle from "./DifficultyCircle";

const useStyles = makeStyles((theme) => ({
  typo: {
    '& > * + *': {
      marginLeft: theme.spacing(0.5),
    },
    fontSize: 15,
    width: 120,
  },
  nothing: {

  },
  solved: {
    backgroundColor: '#d4edc9',
  },
  wrong: {
    backgroundColor: '#ffe3e3',
  },
  partiallySolved: {
    backgroundColor: '#ffff8d',
  },
}));

function ContestElement({ val, diff, problem_name, attempt_status, problemId, accuracy, successfulSubmissions }) {
  const classes = useStyles();

  return (
    <TableCell
    className={
      attempt_status === "green"
        ? classes.solved
        : attempt_status === "red"
        ? classes.wrong
        : attempt_status === "yellow"
        ? classes.partiallySolved
        : classes.nothing
    } 
    align="left">
      <Typography className={classes.typo}>
        <DifficultyCircle accuracy={Math.round(accuracy)} successfulSubmissions={successfulSubmissions} />
        <Link
          target="_blank"
          rel="noopener"
          href={`https://www.codechef.com/${problemId}`}
        >
          {`${problem_name}`}
        </Link>
      </Typography>
    </TableCell>
  );
}

export default ContestElement;