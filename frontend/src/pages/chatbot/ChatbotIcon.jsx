// 아이콘이 자동으로 말풍선을 출력하게
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function ChatbotIcon({ onClick }) {
  const tooltipContent = '안녕하세요 chatbot 나무늘보입니다';
  return (
    <Container>
      <Row>
        <Col xs={4} md={4} onClick={onClick}>
          <OverlayTrigger placement='top' overlay={<Tooltip>{tooltipContent}</Tooltip>}>
            <div style={{ position: 'relative' }}>
              <Image
                src={`${process.env.PUBLIC_URL}/img/나무늘보.jpg`}
                roundedCircle
                style={{ width: '120px', height: '120px', cursor: 'pointer' }}
              />
            </div>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatbotIcon;
