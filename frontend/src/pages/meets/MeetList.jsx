// 모임 리스트

import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import { useSelector } from 'react-redux';
import axios from 'axios';

function MeetList() {
  // 페이지 간 이동
  const navigate = useNavigate();

  const [meetList, setMeetList] = useState({
    status: '',
    message: '',
    pageno: 1,
    pagesize: 10,
    total: 0,
    totalPage: 1,
    data: [],
  });
  const getMeetList = useCallback(async (no = 1, size = 10) => {
    const resp = await axios.get('http://localhost:8000/meets/meetList', { params: { no, size } });
    // console.log(resp.data);
    setMeetList(resp.data);
  }, []);

  useEffect(() => {
    getMeetList();
  }, [getMeetList]);

  const storage = window.sessionStorage;

  storage.removeItem('nickname');

  return (
    <main id='main'>
      <section className='property-grid grid'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              <table className='table table-borderless'>
                <thead>
                  <tr>
                    {/* <th>타이틀</th>
                    <th>온오프라인</th>
                    <th>내용</th> */}
                    {/* <th>멤버 수</th> 추가 해야함 */}
                  </tr>
                </thead>
                <tbody>
                  {meetList.data.map((meetlist) => (
                    <React.Fragment key={meetlist.meet_id}>
                      <tr>
                        <td colSpan={3}>
                          <div style={{ border: '1px solid #000', borderRadius: '10px', padding: '10px' }}>
                            <Link to={`/detail/${meetlist.meet_id}`}>{meetlist.title}</Link>
                            <br />
                            {meetlist.onoff}
                            <br />
                            {meetlist.content}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} className='text-end'>
                      {/* 모임 추가 버튼 */}
                      <button className='btn btn-primary btn-sm' onClick={() => navigate('/insert')}>
                        새로운 모임 작성하기
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MeetList;

MeetList.defaultProps = {
  sub: '',
};
