import React, {useState} from "react";
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import EmojiPicker from "emoji-picker-react";
import CancelIcon from '@material-ui/icons/Cancel';

const ChatInput = (props) => {

  const sendMessage = props.sendMessage;

  const [input, setInput] = useState('');
  const [emojiList, setEmojiList] = useState(false);

  const send = (event) => {
    event.preventDefault();
    if(!input) return;
    sendMessage(input);
    setInput('');
  }

  const showEmojiList = () => {
    setEmojiList(!emojiList);
  }

  const onEmojiClick = (event, emojiObject) => {
    setInput(input + emojiObject.emoji);
  };

  const replaceStringWithEmoji = (string) => {
    const emojiMap = {
      ':)': '😊',
      ':(': '🙁',
      ':D': '😁',
      ';(': '😥',
      ':O': '😮',
      ';)': '😉',
      '8)': '😎',
      ':P': '😛',
      '>:@': '😡',
      '<3': '❤️',
    };
    let regex = /(?::\)|:\(|:D|;\(|:O'|;\)|8\)|>:@|<3|:P)/g
    return string.replace(regex,(m)=>emojiMap[m] || m)
  };

  return(
    <div>
      {
        emojiList && (
          <Emojis onEmojiClick={onEmojiClick} pickerStyle={{ position: 'absolute', bottom: '100px', right: '30px'}}/>
        )
      }
      <Container>
        <InputContainer>
          <form>
            <input
              type='text'
              value={input}
              placeholder='Message here'
              onChange={(event) => {
              setInput(replaceStringWithEmoji(event.target.value));
            }}/>
            <EmojiButton onClick={showEmojiList}>
              {
                emojiList ? (
                  <CloseEmojis />
                ) : (
                  <Emoji />
                )
              }
            </EmojiButton>
            <SendButton onClick={send} type='submit'>
              <Send />
            </SendButton>
          </form>
        </InputContainer>
      </Container>
    </div>
  );
}

export default ChatInput;

const Container = styled.div`
  position: relative;
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

const EmojiButton = styled.div`
  background: #fcf11c;
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
    background: #fff75c;
  }
`

const Emoji = styled(SentimentVerySatisfiedOutlinedIcon)`
  color: #4a4a4a;
`

const Emojis = styled(EmojiPicker)`
  position: absolute;
  top: 123px;
  bottom: 0;
  right: 0;
`

const CloseEmojis = styled(CancelIcon)`
  color: #4a4a4a;
`
