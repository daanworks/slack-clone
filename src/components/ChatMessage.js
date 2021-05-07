import React from "react";
import styled from 'styled-components';

const ChatMessage = (props) => {

  const name = props.name;
  const image = props.image;
  const timestamp = props.timestamp;
  const text = props.text;

  return(
    <Container>
      <UserAvatar>
        <img src={image} />
      </UserAvatar>
      <MessageContent>
        <Name>
          {name}
          <span>{new Date(timestamp.toDate()).toUTCString()}</span>
        </Name>
        <Text>
          {text}
        </Text>
      </MessageContent>
    </Container>
  );
}

export default ChatMessage;

const Container = styled.div`
  padding: 8px 20px;
  display: flex;
  align-items: center;
  :hover{
    background-color: rgba(249,249,249,0.8);
  }
`

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 2px;
  overflow: hidden;
  margin-right: 8px;
  img {
    width: 100%;
    height: 100%;
  }
`

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.span`
  font-weight: 900;
  font-size: 15px;
  line-height: 1.4;
  span {
    margin-left: 8px;
    font-weight: 400;
    color: rgba(97,96,97);
    font-size: 13px;
  }
`

const Text = styled.span`
  
`
