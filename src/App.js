import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import db from "./firebase";
import {useEffect, useState} from "react";
import { auth, provider } from "./firebase";
import { Helmet } from "react-helmet";

function App() {

  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const getChannels = () => {
    db.collection('rooms').onSnapshot((snapshot) => {
      setRooms(snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
          user: doc.data().user
        }
      }))
    });
  }

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem('user');
    });
  }

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <div className="App">
      <Router>
        {
          !user ?
            <div>
              <Helmet>
                <title>Slack clone</title>
              </Helmet>
              <Login setUser={setUser}/>
            </div>
            :
            <Container>
              <Helmet>
                <title>{`Slack clone | ${user.name}`}</title>
              </Helmet>
              <Header user={user} signOut={signOut}/>
              <Main>
                <Sidebar rooms={rooms} user={user}/>
                <Switch>
                  <Route path='/room/:channelId'>
                    <Chat user={user}/>
                  </Route>
                  <Route path='/'>
                    <NoActiveChannelContainer>
                      Select or create channel
                    </NoActiveChannelContainer>
                  </Route>
                </Switch>
              </Main>
            </Container>
        }
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`

const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
`
const NoActiveChannelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
`
