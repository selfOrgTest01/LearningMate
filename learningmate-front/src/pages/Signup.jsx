import axios from 'axios';
import { useCallback, useState } from 'react';
import { Form, Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
function Signup() {
    const [data, setData] = useState({
        email: '',
        phone_number: '',
        password: '',
        nickname: '',
    });
    const fn_insert_data = useCallback((evt) => {
        //변수명을 동적으로 정의하는경우 []안에 넣는다
        setData((data) => ({ ...data, [evt.target.name]: evt.target.value }));
    }, []);
    const fn_submit_data = useCallback(
        async (evt) => {
            const result = await axios.post('http://localhost:8000/users/signup', data);
            console.log(result.data);
            if (result.data.status === 500) window.alert('사용자가 존재합니다');
        },
        [data]
    );
    return (
        <Container fluid style={{ height: '100vh' }}>
            <Row className='justify-content-md-center align-items-center'>
                <Col md={4}>
                    <h1 className='display-1 text-center'>회원가입</h1>
                    <Form onSubmit={fn_submit_data}>
                        <InputGroup className='mb-3'>
                            <Form.Group style={{ flex: 1 }}>
                                <Form.Control
                                    id='email'
                                    type='email'
                                    name='email'
                                    onChange={fn_insert_data}
                                    value={data.email}
                                    placeholder='이메일'
                                />
                            </Form.Group>
                            <Button variant='primary' onClick={() => console.log('인증번호전송')}>
                                인증번호전송
                            </Button>
                        </InputGroup>
                        <Form.Group className='mb-3'>
                            <Form.Control type='text' placeholder='이메일인증번호' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                id='phone_number'
                                type='text'
                                name='phone_number'
                                onChange={fn_insert_data}
                                value={data.phone_number}
                                placeholder='휴대전화번호'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                id='password'
                                type='password'
                                name='password'
                                onChange={fn_insert_data}
                                value={data.password}
                                placeholder='비밀번호'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type='password' placeholder='비밀번호확인' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                id='nickname'
                                type='text'
                                name='nickname'
                                onChange={fn_insert_data}
                                value={data.nickname}
                                placeholder='닉네임'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formGroupEmail'>
                            <Button variant='primary' style={{ width: '100%' }} type='submit'>
                                등록
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
