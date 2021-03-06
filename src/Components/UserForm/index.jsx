import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import getPasswordStrength from 'password-strength-calc';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import useFormal from '@kevinwolf/formal-web';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import userSchema from '../../yupSchemas/user';

import CustomLink from '../CustomLink';

import useStyles from './styles';

function UserForm({ values, onSubmit }) {
  const error = useSelector(state => state.user.error);
  const [passStrength, setPassStrength] = useState(0);
  const classes = useStyles();

  const submit = formValues => {
    onSubmit(formValues);
  };

  const formal = useFormal(values, {
    userSchema,
    onSubmit: submit,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} {...formal.getFormProps()}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formal.values.email}
                type="email"
                onChange={e => formal.change('email', e.target.value)}
                InputProps={{
                  'aria-describedby': 'email-error',
                }}
                error={!!formal.errors.email}
              />
              {formal.errors.email && (
                <FormHelperText id="email-error" error>
                  {formal.errors.email}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{
                  paddingBottom: 5,
                }}
                value={formal.values.password}
                onChange={e => {
                  formal.change('password', e.target.value);
                  setPassStrength(getPasswordStrength(e.target.value));
                }}
                InputProps={{
                  'aria-describedby': 'password-error',
                }}
                error={!!formal.errors.password}
              />
              <LinearProgress variant="determinate" value={passStrength} />
              {formal.errors.password && (
                <FormHelperText id="password-error" error>
                  {formal.errors.password}
                </FormHelperText>
              )}
            </Grid>
            {error && (
              <Grid item xs={12}>
                <FormHelperText error>{error.error.message}</FormHelperText>
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <CustomLink path="/a" text="Already have an account? Sign in" />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

UserForm.propTypes = {
  values: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  values: {
    email: '',
    password: '',
  },
};

export default UserForm;
