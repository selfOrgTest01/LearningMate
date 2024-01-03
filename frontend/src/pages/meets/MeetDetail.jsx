// 모임 디테일

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { getMeetAction } from './../../store/meetStore';

function MeetDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [meetDetail, setmeetDetail] = useState({
    meet_id: '', nickname: '', email: '', title: '', content: '', start_date: '', end_date: '',
    max_num: '', onoff: '', image: '', category: '', approve: '', createdAt: ''
  });

  const getMeetDetail = useCallback(async () => {
    const resp = await axios.get('http://localhost:8000/meets/meet/' + id);
    // console.log(resp.data);
    setmeetDetail(resp.data.data);
    dispatch(getMeetAction(resp.data.data));
  }, [dispatch, setmeetDetail, id]);

  const deleteMeet = useCallback(async (id) => {
    const resp = await axios.delete('http://localhost:8000/meets/delete/' + id);
    console.log(resp.data);
    navigate('/meets');
  }, [navigate]);

  useEffect(() => {
    getMeetDetail();
  }, [getMeetDetail]);

  return (
    <>
      <section className="property-grid grid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table">
                <tbody>
                  <tr>
                    <td>타이틀</td>
                    <td>{meetDetail.title}</td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>{meetDetail.content}</td>
                  </tr>
                  <tr>
                    <td>시작날짜</td>
                    <td>{meetDetail.start_date}</td>
                  </tr>
                  <tr>
                    <td>끝날짜</td>
                    <td>{meetDetail.end_date}</td>
                  </tr>
                  <tr>
                    <td>온오프라인</td>
                    <td>{meetDetail.onoff}</td>
                  </tr>
                  <tr>
                    <td>이미지</td>
                    <td>{meetDetail.image}</td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="text-end">
                      <button className="btn btn-primary btn-sm" onClick={() => navigate('/meets')}>리스트</button>{' '}
                      <button className="btn btn-warning btn-sm" onClick={() => navigate('/update')}>수정</button>{' '}
                      <button className="btn btn-danger btn-sm" onClick={() => deleteMeet(meetDetail.id)}>삭제</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MeetDetail;

MeetDetail.defaultProps = {
  sub: '',
};