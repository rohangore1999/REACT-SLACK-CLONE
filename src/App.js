import React from 'react';
import './App.css';
import styled from 'styled-components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

// react-firebase-hook
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase';
import Login from './components/Login';

import Spinner from "react-spinkit"

function App() {
  // user and loading status
  // auth which we exported from firebase for google
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContent>
          <img
            src="http://assets.stickpng.com/images/5cb480cd5f1b6d3fbadece79.png"
            alt="slack-logo"
          />

          <Spinner
            // name we can get from offical page
            name="ball-spin-fade-loader"
            color="purple"
            fadeIn="none"
          />

        </AppLoadingContent>
      </AppLoading>
    )
  }

  return (
    <div className="app">
      <Router>
        {/* if user is not there then show login component */}
        {!user ? (
          <Login />
        ) :
          // else show home
          (


            <>
              {/* we need header for all the path; so we put outside the switch */}
              <Header />

              {/* AppBody is the entire body except header part */}
              <AppBody>
                <Sidebar />
                <Switch>
                  <Route path="/" exact>
                    {/* Chat */}
                    <Chat />
                  </Route>
                </Switch>
              </AppBody>
            </>
          )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`

const AppLoading = styled.div`
display: grid;
place-items: center;
height: 100vh;
width: 100%;
`

const AppLoadingContent = styled.div`
text-align: center;
padding-bottom: 100px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

>img{
  height: 100px;
  padding:20px;
  margin-bottom: 40px;
}
`