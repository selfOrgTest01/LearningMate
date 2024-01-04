// 모임 생성

import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { changeData, clearData } from '../../store/meetStore';

function MeetInsert() {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.userStore);
  const { meet } = useSelector((state) => state.meetStore);
  const dispatch = useDispatch();

  const insertBoard = useCallback(
    async (evt) => {
      evt.preventDefault();
      const sendData = {
        user_id: userId,
        title: meet.title,
        content: meet.content,
        start_date: meet.start_date,
        // end_date: meet.end_date,
        max_num: meet.max_num,
        onoff: meet.onoff,
        image: meet.image,
        category: meet.category,
        approve: meet.approve,
      };
      await axios.post('http://localhost:8000/meets/insert/', sendData);
      navigate('/meets');
    },
    [meet, userId, navigate],
  );

  // useEffect(() => {
  //   if (!user_id) navigate('/users');
  // }, [navigate, user_id]);

  useEffect(() => {
    dispatch(clearData());
  }, [dispatch]);

  return (
    <main id='main'>
      <section className='property-grid grid'>
        <div className='container'>
          <div className='row'>
            <form className='col-sm-12'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>타이틀</td>
                    <td>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={meet.title}
                        onChange={(evt) => dispatch(changeData(evt))}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>
                      <textarea
                        cols='80'
                        rows='10'
                        name='content'
                        className='form-control'
                        value={meet.content}
                        onChange={(evt) => dispatch(changeData(evt))}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>일정</td>
                    <td>
                      <textarea
                        cols='80'
                        rows='10'
                        name='content'
                        className='form-control'
                        value={meet.start_end}
                        onChange={(evt) => dispatch(changeData(evt))}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>참여 최대 인원</td>
                    <td>
                      <textarea
                        cols='80'
                        rows='10'
                        name='content'
                        className='form-control'
                        value={meet.max_num}
                        onChange={(evt) => dispatch(changeData(evt))}
                      ></textarea>
                    </td>
                  </tr>
                  {/* <tr>
                    <td>생성자</td>
                    <td><textarea cols="80" rows="10" name="content" className="form-control"
                      value={meet.content} onChange={(evt) => dispatch(changeData(evt))}></textarea></td>
                  </tr> */}
                  <tr>
                    <td>온오프라인</td>
                    <td>
                      <textarea
                        cols='80'
                        rows='10'
                        name='content'
                        className='form-control'
                        value={meet.onoff}
                        onChange={(evt) => dispatch(changeData(evt))}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>관련 이미지</td>
                    <td>
                      <textarea
                        cols='80'
                        rows='10'
                        name='content'
                        className='form-control'
                        value={meet.image}
                        onChange={(evt) => dispatch(changeData(evt))}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>카테고리 선택</td>
                    <td>
                      <textarea
                        cols='80'
                        rows='10'
                        name='content'
                        className='form-control'
                        value={meet.category}
                        onChange={(evt) => dispatch(changeData(evt))}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>승인 허가 여부</td>
                    <td>
                      <textarea
                        cols='80'
                        rows='10'
                        name='content'
                        className='form-control'
                        value={meet.approve}
                        onChange={(evt) => dispatch(changeData(evt))}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='2' className='text-end'>
                      <button type='button' className='btn btn-primary btn-sm' onClick={() => navigate('/meets')}>
                        취소
                      </button>{' '}
                      <button type='submit' className='btn btn-warning btn-sm' onClick={insertBoard}>
                        입력
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MeetInsert;

MeetInsert.defaultProps = {
  sub: '',
};
