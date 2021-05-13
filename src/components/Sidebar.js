import React, {useState} from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { sideBarItems } from "../data/SideBarData";
import AddIcon from '@material-ui/icons/Add';
import db from '../firebase';
import { useHistory } from 'react-router-dom';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { Zoom } from '@material-ui/core';

const Sidebar = (props) => {

  const history = useHistory();
  const rooms = props.rooms;
  const user = props.user;
  const [showDeleteChannel, setShowDeleteChannel] = useState(false);

  const goToChannel = (id) => {
    if(id) {
      history.push(`/room/${id}`);
    }
  }

  const addChannel = () => {
    const channelName = prompt('Enter channel name:');
    if(channelName) {
      db.collection('rooms').add({
        name: channelName,
        user: user.name
      }).then((result) => {
        history.push(`/room/${result.id}`);
      })
    }
  }

  const removeChannel = (id) => {
    db.collection('rooms').doc(id).delete().then(() => {
      history.push('/');
    });
  }

  const showDeleteChannelButton = (channelId, user, rooms) => {
    const findChannelById = (channelId) => {
      for (let i = 0; i < rooms.length; i++) {
        if(rooms[i].id === channelId) {
          return rooms[i];
        }
      }
    }
    const room = findChannelById(channelId);
    return room.user === user.name;
  }

  return(
    <Container>
      <WorkspaceContainer>
        <Name>
          DAANWORKS
        </Name>
        <NewMessage>
          <AddCircleOutlineIcon />
        </NewMessage>
      </WorkspaceContainer>
      <MainChannels>
        {
          sideBarItems.map(item => (
            <MainChannelItem>
              {item.icon}
              {item.text}
            </MainChannelItem>
          ))
        }
      </MainChannels>
      <ChannelsContainer>
        <NewChannelContainer>
          <div>
            Channels
          </div>
          <Add onClick={addChannel} />
        </NewChannelContainer>
        <ChannelsList>
          {
            rooms.map((room) => (
              <Channel
                key={room.id}
                onClick={() => {goToChannel(room.id)}}
                onMouseEnter={() => {setShowDeleteChannel(showDeleteChannelButton(room.id, user, rooms))}}
                onMouseLeave={() => {setShowDeleteChannel(false)}}
              >
                # {room.name}
              </Channel>
            ))
          }
        </ChannelsList>
      </ChannelsContainer>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  background-color: #3f0e40;
`

const WorkspaceContainer = styled.div`
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  padding-right: 19px;
  justify-content: space-between;
  border-bottom: 1px solid #532753;
`

const Name = styled.div`
  
`

const NewMessage = styled.div`
  width: 36px;
  height: 36px;
  background: white;
  color: #3f0e40;
  fill: #3f0e40;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
`

const MainChannels = styled.div`
  padding-top: 20px;
  
`

const MainChannelItem = styled.div`
  color: rgb(188, 171, 188);
  display: grid;
  grid-template-columns: 15% auto;
  height: 28px;
  align-items: center;
  padding-left: 19px;
  cursor: pointer;
  :hover {
    background-color: #350d36;
  }
`

const ChannelsContainer = styled.div`
  margin-top: 10px;
  color: rgb(188, 171, 188);
`

const NewChannelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  padding-left: 19px;
  padding-right: 12px;
`

const ChannelsList = styled.div`
  padding-right: 12px;
`

const Channel = styled.div`
  padding-left: 19px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  :hover {
    background-color: #350d36;
  }
`

const Add = styled(AddIcon)`
  cursor: pointer;
`
