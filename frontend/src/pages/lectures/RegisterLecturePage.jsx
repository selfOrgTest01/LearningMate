// 따로 설정 안했는데 userid가 없어서 로그인 안하면 업로드가 안됨
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { localDomain } from '../../config/config';

function RegisterLecturePage() {
  const inputRef = useRef();
  const navigate = useNavigate();
  // 로그인한 유저의 userId
  const userId = useSelector((state) => state.userInfo.userId);
  // input에서 선택한 파일의 이름
  const [selectedFileName, setSelectedFileName] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {}, mode: 'onBlur' });

  const handleFileChange = (e) => {
    const fileName = e.target.files[0].name;
    setSelectedFileName(fileName);
  };
  const onSubmitEvent = useCallback(
    async (formSubmitData) => {
      console.log('등록됨');
      try {
        const submitData = { ...formSubmitData, user_id: userId };
        console.log(submitData);
        const formData = new FormData();
        const { files } = document.querySelector('input[name="lectureVideo"]');
        formData.append('data', JSON.stringify(submitData));
        formData.append('lectureVideo', files[0]);
        await axios.post(`${localDomain}/courses/insert`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [userId],
  );
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row className='justify-content-md-center'>
        <Col md={4}>
          <h1 className='display-1 text-center' style={{ marginTop: 100 }}>
            강의 등록
          </h1>
          <form onSubmit={handleSubmit(onSubmitEvent)}>
            <label htmlFor='title'>제목</label>
            <Form.Group className='mb-3'>
              <Form.Control
                id='title'
                name='title'
                type='text'
                placeholder='제목을 입력하세요'
                {...register('title', { required: true, maxLength: 70 })}
                defaultValue=''
              />
              {errors.title?.type === 'required' && '제목을 입력하세요'}
            </Form.Group>
            <label htmlFor='category'>카테고리</label>
            <Form.Group className='mb-3'>
              <Form.Select id='category' name='category' {...register('category', { required: true })}>
                <option value=''>카테고리를 선택해주세요</option>
                <option value='운동/건강'>운동/건강</option>
                <option value='IT'>IT</option>
                <option value='자기계발'>자기계발</option>
                <option value='교육 및 학문'>교육 및 학문</option>
                <option value='의학'>의학</option>
                <option value='기타'>기타</option>
              </Form.Select>
              {errors.category?.type === 'required' && '카테고리를 선택하세요'}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>강의 설명</Form.Label>
              <Form.Control
                as='textarea'
                rows={8}
                placeholder='강의 설명을 입력하세요'
                {...register('content', { maxLength: 300 })}
              />
            </Form.Group>
            <div className='col-sm-12 mb-3'>
              <label htmlFor='lectureVideo' className='form-label'>
                업로드할 영상을 선택해주세요
              </label>
              <br />
              <input
                type='file'
                className='form-control'
                id='lectureVideo'
                name='lectureVideo'
                accept='video/*'
                {...register('lectureVideo')}
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button variant='success' size='sm' onClick={() => inputRef.current.click()}>
                영상선택
              </Button>
              {selectedFileName && <p style={{ display: 'inline-block', marginLeft: '10px' }}>{selectedFileName}</p>}
              <br />
              {/* 밑에 코드가 안먹히는 이유를 모르겠음 input을 {required: true}로 설정한다음에 파일을 선택해도 errors가 true로 나옴 */}
              {/* {errors.lectureVideo && '업로드할 영상을 선택하지 않았습니다'} */}
              {!selectedFileName && '업로드할 영상을 선택하지 않았습니다'}
            </div>
            <Form.Group className='mb-3'>
              <Button variant='primary' style={{ width: '100%' }} type='submit' disabled={!selectedFileName}>
                등록
              </Button>
            </Form.Group>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
export default RegisterLecturePage;
