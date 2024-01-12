import { Container } from 'react-bootstrap';
import './styles.css';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useRef, useState } from 'react';
import fetchAIResponse from '../../containers/Chatbot/FetchAIResponse';
import TypingEffect from '../../components/HomePage/ChatBot/TypingEffect';

function ChatbotPage() {
  const [chatMessage, setChatMessage] = useState([]);
  // useRef 훅은 컴포넌트 간에 유지되는 변경 가능한 객체를 생성하는데 사용됩니다.
  const chatMessageRef = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const submitEvent = useCallback(
    async (submitData) => {
      try {
        setChatMessage((currentMessage) => [{ type: 'user', message: submitData.userInput }, ...currentMessage]);
        setValue('userInput', '');
        const chatbotResponse = await fetchAIResponse(submitData.userInput);
        setChatMessage((currentMessage) => [{ type: 'chatbot', message: chatbotResponse }, ...currentMessage]);
      } catch (error) {
        console.log(error);
      }
    },
    [setValue],
  );

  useEffect(() => {
    // 스크롤을 자동으로 아래로 이동
    // scrollTop은 스크롤바의 상단에서부터 현재 스크롤된 위치까지의 거리를 나타냅니다
    // scrollHeight는 스크롤이 가능한 요소의 총 높이를 나타내며, 이 높이는 일반적으로 위에서 아래로 측정됩니다.
    // 따라서 scrollTop을 scrollHeight로 설정하면 스크롤이 맨 아래로 이동하게 됩니다.
    chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
  }, [chatMessage]);
  return (
    <Container className='chatbot-body-style'>
      <div id='chat-container'>
        {/* useRef의 ref속성을 사용해 요소를 참조 */}
        <div id='chat-messages' ref={chatMessageRef}>
          {chatMessage.map((item, index) => (
            <div key={index} className={`message ${item.type}`}>
              {/* eslint-disable no-nested-ternary */}
              {/* 중첩된 삼항연산자를 쓸수밖에 없어서 사용함 */}
              {item.type === 'user' ? item.message : index === 0 ? <TypingEffect text={item.message} /> : item.message}
            </div>
          ))}
        </div>
        <form id='user-input' onSubmit={handleSubmit(submitEvent)}>
          <input type='text' placeholder='메시지를 입력하세요...' {...register('userInput', { required: true })} />
          <button type='submit'>전송</button>
          <div id='user-input-error-messages' style={{ height: '12px' }}>
            {errors.userInput && '질문을 입력하세요'}
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ChatbotPage;
