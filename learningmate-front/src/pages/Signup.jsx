import axios from 'axios';
import { useCallback, useState } from 'react';
import { Form, Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { serverDomain } from '../config/config';

function Signup() {
    const [data, setData] = useState({
        email: '',
        phone_number: '',
        password: '',
        nickname: '',
    });
    const [duplicateEmail, setDuplicateEmail] = useState(false);
    const [duplicatePhone, setDuplicatePhone] = useState(false);
    const [duplicateNickname, setDuplicateNickname] = useState(false);

    const navigate = useNavigate();
    //데이터를 읽어오는 함수
    const fn_read_data = useCallback(async () => {
        try {
            const result = await axios.get(`${serverDomain}/users/check`);
            // console.log(result.data.data);
            return result;
        } catch (err) {
            console.log('에러:', err);
        }
    }, []);
    //input에 데이터를 입력
    const fn_insert_data = useCallback((evt) => {
        //변수명을 동적으로 정의하는경우 []안에 넣는다
        setData((data) => ({ ...data, [evt.target.name]: evt.target.value }));
    }, []);

    //email중복확인
    const fn_check_email = useCallback(async () => {
        const result = await fn_read_data();

        let isDuplicate = false;
        //forEach 문에서는 return이나 break를 못쓴다 때문에 isDuplicate 변수를 따로 둬서 사용함
        result.data.data.forEach((item) => {
            if (item.email === data.email) {
                //중복이 있을때만 설정한 변수를 true로 바꾼다
                isDuplicate = true;
            }
            //없는경우엔 그대로 false
            setDuplicateEmail(isDuplicate);
        });
    }, [data.email, fn_read_data]);
    //휴대전화번호 중복확인
    const fn_check_phone = useCallback(async () => {
        const result = await fn_read_data();

        let isDuplicate = false;
        result.data.data.forEach((item) => {
            if (item.phone_number === data.phone_number) {
                isDuplicate = true;
            }
            setDuplicatePhone(isDuplicate);
        });
    }, [data.phone_number, fn_read_data]);
    //닉네임 중복확인
    //useCallback에서 의존성 배열에 명시하지 않으면 해당 함수는 초기 렌더링 때 한 번만 생성되고,
    //이후에는 해당 함수가 참조하는 상태나 함수의 변경을 감지하지 않습니다. 즉, 초기 렌더링 시의 값들이 고정적으로 사용되게 됩니다.
    const fn_check_nickname = useCallback(async () => {
        const result = await fn_read_data();

        let isDuplicate = false;
        result.data.data.forEach((item) => {
            if (item.nickname === data.nickname) {
                isDuplicate = true;
            }
            setDuplicateNickname(isDuplicate);
        });
    }, [data.nickname, fn_read_data]);

    const fn_submit_data = useCallback(
        async (evt) => {
            evt.preventDefault();
            const result = await axios.post(`${serverDomain}/users/signup`, data);
            if (result.data.status === 500) {
                window.alert('등록되지 않았습니다 에러가 발생했어요');
            } else {
                navigate('/');
            }
        },
        [data, navigate]
    );

    return (
        <Container fluid style={{ backgroundColor: '#95a5a6', height: '100vh' }}>
            <Row className='justify-content-md-center'>
                <Col md={4}>
                    <h1 className='display-1 text-center' style={{ marginTop: 100 }}>
                        회원가입
                    </h1>
                    <Form onSubmit={fn_submit_data}>
                        <InputGroup className='mb-3'>
                            <Form.Group style={{ flex: 1 }}>
                                <Form.Control
                                    id='email'
                                    type='email'
                                    name='email'
                                    onChange={fn_insert_data}
                                    value={data.email}
                                    required
                                    placeholder='이메일'
                                    onBlur={fn_check_email}
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
                                required
                                placeholder='휴대전화번호'
                                onBlur={fn_check_phone}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                id='password'
                                type='password'
                                name='password'
                                onChange={fn_insert_data}
                                value={data.password}
                                required
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
                                required
                                placeholder='닉네임'
                                onBlur={fn_check_nickname}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formGroupEmail'>
                            <Button
                                variant='primary'
                                style={{ width: '100%' }}
                                type='submit'
                                //중복되는게 하나라도 있다면 버튼이 disabled됩니다
                                disabled={duplicateEmail || duplicatePhone || duplicateNickname}
                            >
                                등록
                            </Button>
                        </Form.Group>
                    </Form>
                    {duplicateEmail && <p>-중복된 이메일입니다.</p>}
                    {duplicatePhone && <p>-중복된 휴대전화번호입니다.</p>}
                    {duplicateNickname && <p>-중복된 닉네임입니다.</p>}
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
