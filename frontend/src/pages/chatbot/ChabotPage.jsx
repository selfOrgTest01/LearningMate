import { Container } from 'react-bootstrap';
import './styles.css';

function ChatbotPage() {
  return (
    <Container className='chatbot-body-style'>
      <div id='chat-container'>
        <div id='chat-messages'></div>
        <div id='user-input'>
          <form>
            {/* 새로고침 막는거 넣어야함 */}
            <input type='text' placeholder='메시지를 입력하세요...' />
            <button type='submit'>전송</button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default ChatbotPage;
