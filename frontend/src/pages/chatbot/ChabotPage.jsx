import { Container } from 'react-bootstrap';
import './styles.css';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useRef, useState } from 'react';

function ChatbotPage() {
  const [chatMessage, setChatMessage] = useState([]);
  const apiKey = process.env.REACT_APP_OPEN_API_KEY;
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  // useRef 훅은 컴포넌트 간에 유지되는 변경 가능한 객체를 생성하는데 사용됩니다.
  const chatMessageRef = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const fetchAiResponse = useCallback(
    async (prompt) => {
      const requestOptions = {
        method: 'POST',
        // API 요청의 헤더를 설정
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // 사용할 AI 모델
          messages: [
            {
              role: 'user', // 메시지 역할을 user로 설정
              content: prompt, // 사용자가 입력한 메시지
            },
          ],
          temperature: 0.8, // 모델의 출력 다양성
          max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
          top_p: 1, // 토큰 샘플링 확률을 설정
          frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
          presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
          stop: ['Human'], // 생성된 텍스트에서 종료 구문을 설정
        }),
      };
      // API 요청후 응답 처리
      try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        return aiResponse;
      } catch (error) {
        console.error('OpenAI API 호출 중 오류 발생:', error);
        return 'OpenAI API 호출 중 오류 발생';
      }
    },
    [apiKey],
  );

  const submitEvent = useCallback(
    async (submitData) => {
      try {
        setChatMessage((currentMessage) => [{ type: 'user', message: submitData.userInput }, ...currentMessage]);
        setValue('userInput', '');
        const chatbotResponse = await fetchAiResponse(submitData.userInput);
        setChatMessage((currentMessage) => [{ type: 'chatbot', message: chatbotResponse }, ...currentMessage]);
      } catch (error) {
        console.log(error);
      }
    },
    [setValue, fetchAiResponse],
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
              {item.message}
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
