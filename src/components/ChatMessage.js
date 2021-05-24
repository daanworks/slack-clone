import React, {useState} from "react";
import styled from 'styled-components';
import BackspaceIcon from '@material-ui/icons/Backspace';
import EditIcon from '@material-ui/icons/Edit';
import db from "../firebase";
import EditMessage from "./EditMessage";

const ChatMessage = (props) => {

  const name = props.name;
  const image = props.image;
  const timestamp = props.timestamp;
  const text = props.text;
  const messageId = props.messageId;
  const channelId = props.channelId;
  const user = props.user;

  const [isShown, setIsShown] = useState(false);
  const [edit, setEdit] = useState(false);

  const deleteMessage = () => {
    db.collection('rooms').doc(channelId)
      .collection('messages').doc(messageId)
      .delete();
  }

  const editMessage = (event) => {
    setEdit(!edit);
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
        {
          !edit && (
            <Text>
              {text}
            </Text>
          )
        }
        {
          edit && (
            <EditContainer>
              <EditMessage message={text} channelId={channelId} messageId={messageId} setEdit={setEdit}/>
            </EditContainer>
          )
        }
      </MessageContent>
      {
        isShown && user.name === name && (
          <UserButtonContainer>
            <DeleteButtonContainer onClick={deleteMessage}>
              <DeleteButton />
            </DeleteButtonContainer>
            <EditButtonContainer onClick={editMessage}>
              <EditButton />
            </EditButtonContainer>
          </UserButtonContainer>
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

const UserButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const DeleteButton = styled(BackspaceIcon)`
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

const EditButtonContainer = styled.div`
  color: green;
  display: flex;
  align-items: center;
  justify-content: center;
`

const EditButton = styled(EditIcon)`
  position: absolute;
  right: 0;
  margin-right: 52px;
  cursor: pointer;
`

const EditContainer = styled.div`
  
`
