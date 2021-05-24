import React, {useState} from "react";
import styled from "styled-components";
import db from "../firebase";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const EditMessage = (props) => {

  const message = props.message;
  const channelId = props.channelId;
  const messageId = props.messageId;
  const setEdit = props.setEdit;

  const [editedMessage, setEditedMessage] = useState(message);

  return(
    <Form>
      <input autoFocus={true} value={editedMessage} onChange={(event) => {
        event.preventDefault();
        setEditedMessage(event.target.value);
      }} type='text' />
      <UpdateChanges fontSize='small' onClick={async () => {
        const originalMessage = db.collection('rooms').doc(channelId)
          .collection('messages').doc(messageId);
        const res = await originalMessage.update({text: editedMessage}).then((result) => {
          setEdit(false);
        });
      }} />
    </Form>
  )
}

export default EditMessage;

const Form = styled.form`
  display: flex;
  input{
    outline: none;
    border: none;
    background: transparent;
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-style: italic;
    width: 300px;
  }
  button{
    height: 18px;
  }
`

const UpdateChanges = styled(CheckCircleIcon)`
  cursor: pointer;
  color: green;
  margin: 0;
`
