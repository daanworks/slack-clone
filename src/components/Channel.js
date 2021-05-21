import React, {useState} from "react";
import styled from 'styled-components';
import db from "../firebase";
import {useHistory} from "react-router-dom";
import {Zoom} from "@material-ui/core";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";

const Channel = (props) => {

  const history = useHistory();

  const room = props.room;
  const user = props.user;

  const [showDeleteChannel, setShowDeleteChannel] = useState(false);

  const removeChannel = (id) => {
    db.collection('rooms').doc(room.id).delete().then(() => {
      history.push('/');
    });
  }

  const showDeleteChannelButton = (user, room) => {
    return room.user === user.name;
  }

  return(
    <Container
      onMouseEnter={() => {setShowDeleteChannel(showDeleteChannelButton(user, room))}}
      onMouseLeave={() => {setShowDeleteChannel(false)}}
    >
      # {room.name}
      {
        showDeleteChannel && (
          <Zoom in={showDeleteChannel}>
            <RemoveOutlinedIcon onClick={() => {removeChannel(room.id)}} />
          </Zoom>
        )
      }
    </Container>
  );
}

export default Channel;

const Container = styled.div`
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


