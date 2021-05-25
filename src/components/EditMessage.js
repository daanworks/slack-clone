import React, {useState} from "react";
import styled from "styled-components";
import db from "../firebase";

const EditMessage = (props) => {

  const message = props.message;
  const channelId = props.channelId;
  const messageId = props.messageId;
  const setEdit = props.setEdit;

  const [editedMessage, setEditedMessage] = useState(message);

  const commitEditedMessage = async () => {
    const originalMessage = db.collection('rooms').doc(channelId)
      .collection('messages').doc(messageId);
    const res = await originalMessage.update({
      text: editedMessage,
      isModified: true
    }).then(() => {
      setEdit(false);
    })
  }

  return(
    <Form onSubmit={(event) => {
      event.preventDefault();
      commitEditedMessage();
    }}>
      <input autoFocus={true} value={editedMessage} onChange={(event) => {
        event.preventDefault();
        setEditedMessage(event.target.value);
      }} type='text' />
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
    padding: 0;
    margin-bottom: -1px;
    margin-top: 1px;
    font-size: 16px;
    font-style: italic;
    width: 600px;
    letter-spacing: 0.1px;
  }
  button{
    height: 18px;
  }
`
