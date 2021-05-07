import React, {useState} from "react";
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';

const ChatInput = (props) => {

  const sendMessage = props.sendMessage;

  const [input, setInput] = useState('');

  const send = (event) => {
    event.preventDefault();
    if(!input) return;
    sendMessage(input);
    setInput('');
  }

  return(
    <Container>
      <InputContainer>
        <form>
          <input
            type='text'
            value={input}
            placeholder='Message here'
            onChange={(event) => {
            setInput(event.target.value);
          }}/>
          <SendButton onClick={send} type='submit'>
            <Send />
          </SendButton>
        </form>
      </InputContainer>
    </Container>
  );
}

export default ChatInput;

const Container = styled.div`
  border-top: 1px solid rgba(83, 39, 83, .13);
  padding-top: 24px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 24px;
`

const InputContainer = styled.div`
  border: 1px solid #8d8d8e;
  border-radius: 4px;
  form {
    height: 42px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    input {
      flex: 1;
      border: none;
      font-size: 13px;
    }
    input:focus {
      outline: none;
    }
  }
`

const SendButton = styled.button`
  background: #007a5a;
  border-radius: 2px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 5px;
  cursor: pointer;
  border: none;
  :hover {
    background: #148567;
  }
`

const Send = styled(SendIcon)`
  color: #d9d9d9;
`
