import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import db from '../firebase'
import {useParams} from 'react-router-dom';
import firebase from 'firebase';

const Chat = (props) => {

  let { channelId } = useParams();
  const user = props.user;
  const [channel, setChannel] = useState();
  const [messages, setMessages] = useState([]);
  const [channelCreator, setChannelCreator] = useState('');

  const getMessages = () => {
    db.collection('rooms').doc(channelId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot => {
        setMessages(snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            text: doc.data().text,
            timestamp: new Date(doc.data().timestamp.toDate()).toUTCString(),
            user: doc.data().user,
            userImage: doc.data().userImage,
            isModified: doc.data().isModified
          }
        }))
    }))
  }

  const sendMessage = (text) => {
    if(channelId) {
      let payload = {
        text: text,
        user: user.name,
        userImage: user.photo,
        timestamp: firebase.firestore.Timestamp.now(),
        isModified: false,
      }
      db.collection('rooms').doc(channelId).collection('messages').add(payload);
    }
  }

  const getChannelName = () => {
    db.collection('rooms').doc(channelId).onSnapshot((snapshot) => {
      setChannel(snapshot.data());
    })
  }

  const getChannelCreator = () => {
    db.collection('rooms').doc(channelId).onSnapshot((snapshot) => {
      setChannelCreator(snapshot.data().user);
    });
  }

  const scrollToBottom = () => {
    let messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
  }

  useEffect(() => {
    getChannelName();
    getChannelCreator();
    getMessages();
    scrollToBottom();
  }, [channelId]);

  return(
    <Container>
      <Header>
        <Channel>
          <ChannelName>
            # {channel && channel.name}
          </ChannelName>
          <ChannelInfo>
            {channelCreator}'s channel
          </ChannelInfo>
        </Channel>
        <ChannelDetails>
          <div>
            Details
          </div>
          <Info />
        </ChannelDetails>
      </Header>
      <MessageContainer id='messages'>
        {
          messages.length > 0 &&
            messages.map((data, index) => (
              <ChatMessage
                key={data.id}
                text={data.text}
                name={data.user}
                image={data.userImage}
                timestamp={data.timestamp}
                isModified={data.isModified}
                messageId={data.id}
                channelId={channelId}
                user={user}
              />
            ))
        }
      </MessageContainer>
      <ChatInput sendMessage={sendMessage} user={user}/>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: grid;
  grid-template-rows: 64px auto min-content;
  min-height: 0;
`

const Header = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(83, 39, 83, .13);
  justify-content: space-between;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
`

const Channel = styled.div`
  
`

const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
  color: #606060;
`

const ChannelName = styled.div`
  font-weight: 700;
`

const ChannelInfo = styled.div`
  font-weight: 400;
  color: #606060;
  font-size: 13px;
  margin-top: 8px;
`

const Info = styled(InfoOutlinedIcon)`
  margin-left: 10px;
`
