import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typo: {
    '& > * + *': {
      marginLeft: theme.spacing(0.5),
    },
    fontSize: 15,
    width: 120,
  },
  topcoderLikeCircle: {
    border: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    color: '#FE6B8B',
    height: 12,
    width: 12,
    marginRight: 5,
    display: 'inline-block'
  }
}));

const DifficultyCircle = ({ accuracy, successfulSubmissions }) => {
  const classes = useStyles();

  return (
    <span style={{display: 'inline-block'}}>
      <Tooltip title={`Accuracy: ${accuracy}%   Submissions: ${successfulSubmissions}`} arrow>
        <span style={{background: `linear-gradient(to top, #FE6B8B 0%, #FE6B8B ${accuracy}%, #ffffff ${accuracy}%, #ffffff 100%)`}} className={classes.topcoderLikeCircle} />
      </Tooltip>
    </span>
  )
}

export default DifficultyCircle
