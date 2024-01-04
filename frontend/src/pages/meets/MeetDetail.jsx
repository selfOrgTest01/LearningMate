// 모임 디테일
// 24.01.03 - 데이터 나오는데 화면에 안 나옴

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { getMeetAction } from '../../store/meetStore';

function MeetDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [meet, setmeet] = useState({
    meet_id: '',
    nickname: '',
    email: '',
    title: '',
    content: '',
    start_date: '',
    end_date: '',
    max_num: '',
    onoff: '',
    image: '',
    category: '',
    approve: '',
    createdAt: '',
  });

  const getMeetDetail = useCallback(async () => {
    const resp = await axios.get(`http://localhost:8000/meets/meet/${id}`);
    // console.log(resp.data);
    setmeet(resp.data.data);
    dispatch(getMeetAction(resp.data.data));
  }, [dispatch, setmeet, id]);

  const deleteMeet = useCallback(
    async (meetId) => {
      await axios.delete(`http://localhost:8000/meets/delete/${meetId}`);
      // console.log(resp.data);
      navigate('/meets');
    },
    [navigate],
  );

  useEffect(() => {
    getMeetDetail();
  }, [getMeetDetail]);

  return (
    <>
      <section className='property-grid grid'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>타이틀</td>
                    <td>{meet.title}</td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>{meet.content}</td>
                  </tr>
                  <tr>
                    <td>시작날짜</td>
                    <td>{meet.start_date}</td>
                  </tr>
                  <tr>
                    <td>끝날짜</td>
                    <td>{meet.end_date}</td>
                  </tr>
                  <tr>
                    <td>온오프라인</td>
                    <td>{meet.onoff}</td>
                  </tr>
                  <tr>
                    <td>이미지</td>
                    <td>{meet.image}</td>
                  </tr>
                  <tr>
                    <td colSpan='2' className='text-end'>
                      <button className='btn btn-primary btn-sm' onClick={() => navigate('/meets')}>
                        리스트
                      </button>{' '}
                      <button className='btn btn-warning btn-sm' onClick={() => navigate('/update')}>
                        수정
                      </button>{' '}
                      <button className='btn btn-danger btn-sm' onClick={() => deleteMeet(meet.meet_id)}>
                        삭제
                      </button>
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
