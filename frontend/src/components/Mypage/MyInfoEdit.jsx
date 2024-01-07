import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function MyInfoEdit({ onCancel, onSave }) {
  const [editedData, setEditedData] = useState({
    닉네임: '',
    전화번호: '',
    이메일: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div>
      <h1>내 정보 수정하기</h1>
      <Form>
        <Form.Group controlId='formEmail'>
          <Form.Label>닉네임</Form.Label>
          <Form.Control type='text' name='nickname' value={editedData.nickname} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId='formPhoneNumber'>
          <Form.Label>전화번호</Form.Label>
          <Form.Control type='tel' name='phone_number' value={editedData.phone_number} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId='formNickname'>
          <Form.Label>이메일</Form.Label>
          <Form.Control type='email' name='email' value={editedData.email} onChange={handleChange} />
        </Form.Group>

        <Button variant='primary' onClick={handleSave}>
          저장하기
        </Button>
        <Button variant='secondary' onClick={onCancel}>
          취소
        </Button>
      </Form>
    </div>
  );
}

export default MyInfoEdit;
