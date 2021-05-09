import React, {useState} from "react";
import styled from 'styled-components';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import db from "../firebase";

const ChatMessage = (props) => {

  const name = props.name;
  const image = props.image;
  const timestamp = props.timestamp;
  const text = props.text;
  const messageId = props.messageId;
  const channelId = props.channelId;
  const user = props.user;

  const [isShown, setIsShown] = useState(false);

  const deleteMessage = () => {
    db.collection('rooms').doc(channelId)
      .collection('messages').doc(messageId)
      .delete();
  }

  return(
    <Container onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
      <UserAvatar>
        <img src={image} />
      </UserAvatar>
      <MessageContent>
        <Name>
          {name}
          <span>{timestamp}</span>
        </Name>
        <Text>
          {text}
        </Text>
      </MessageContent>
      {
        isShown && user.name === name && (
          <DeleteButtonContainer onClick={deleteMessage}>
            <DeleteButton />
          </DeleteButtonContainer>
        )
      }
    </Container>
  );
}

export default ChatMessage;

const Container = styled.div`
  position: relative;
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

const DeleteButton = styled(HighlightOffOutlinedIcon)`
  position: absolute;
  right: 0;
  margin-right: 16px;
  cursor: pointer;
`

const DeleteButtonContainer = styled.div`
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`
