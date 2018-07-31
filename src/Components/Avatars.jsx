import React          from 'react';
import PropTypes      from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar         from '@material-ui/core/Avatar';
import randomColor    from 'randomcolor';

let user = {
  name: "Mo",
  initial: name.slice(0, 1)
  avColor: randomColor()
}

const styles = {
  avatar: {
    margin: 10,
  },
  colorAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: user.avColor,
};

function LetterAvatars(props) {
  const { classes } = props;
  return (
      <Avatar className={classes.colorAvatar}>{user.initial}</Avatar>
  );
}

LetterAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterAvatars);