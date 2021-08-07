import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout/Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Layout/>
    </div>
  );
}

export default App;
