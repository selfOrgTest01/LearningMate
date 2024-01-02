// 모임 리스트를 보여줌

import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil'

import { boardListState, boardListSelector } from '@recoils/board'

function BoardList() {
  const navigate = useNavigate();

  // recoil Atom의 값만 취득
  const boardList = useRecoilValue(boardListState);
  // recoil Selector에서 리스트 호출 부분만 취득. 
  // 호출되면 위의 boardListState의 값이 변경되고 변경 후 boardListState를 사용한 이 컴퍼넌트가 재 렌더링 된다
  const { getBoardList } = useRecoilValue(boardListSelector);

  useEffect(() => {
    getBoardList(1, 10);
  }, [getBoardList])

  return (
    <main id="main">
      {/*  ======= Property Grid =======  */}
      <section className="property-grid grid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>타이틀</th>
                    <th>이름</th>
                    <th>작성일</th>
                    <th>조회수</th>
                  </tr>
                </thead>
                <tbody>
                  {boardList?.boards?.map((board) => (
                    <tr key={board.id}>
                      <td>{board.id}</td>
                      <td><Link to={'/boardDetail/' + board.id}>{board.title}</Link></td>
                      <td>{board.name}</td>
                      <td>{board.createdAt}</td>
                      <td>{board.cnt}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} className="text-end">
                      <button className="btn btn-outline-secondary" onClick={() => navigate('/boardInsert')}>ADD</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BoardList;

BoardList.defaultProps = {
  sub: ''
};
