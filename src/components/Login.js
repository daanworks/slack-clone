import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useHistory } from "react-router-dom";

const Login = (props) => {

  const history = useHistory();
  const setUser = props.setUser;

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = {
          name: result.user.displayName,
          photo: result.user.photoURL,
        }
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        history.push('/room');
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  return(
    <Container>
      <Content>
        <SlackImage src='https://images.prismic.io/smarttask/1c150a8e-9f13-420e-8b0f-e6365219250f_slack.png?auto=compress,format'/>
        <h1>Sign in Slack</h1>
        <SignInButton onClick={signIn}>
          Sign In With Google
        </SignInButton>
      </Content>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
`

const SlackImage = styled.img`
  height: 100px;
  margin-bottom: 35px;
`

const Content = styled.div`
  background-color: white;
  padding: 100px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SignInButton = styled.button`
  margin-top: 35px;
  background-color: #0a8d48;
  color: white;
  border: none;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
`
