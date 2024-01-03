import { useCallback, useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

// 이 코드는 React에서 사용할 수 있는 커스텀 훅인 useInput을 정의한 것

// value: 상태 값으로, 입력 필드의 현재 값을 나타냅니다.
// handler: 입력 필드의 값이 변경될 때 실행되는 함수로, 이벤트 핸들러입니다. 이 핸들러는 입력 값이 변경될 때마다 호출되어 setValue 함수를 사용하여 value 상태를 업데이트합니다.
// setValue: value 상태를 업데이트하는 함수입니다.
// 이 훅을 사용하면 아래와 같이 간단하게 입력 필드의 상태를 관리할 수 있습니다.


export default useInput;

// import React from 'react';
// import useInput from './useInput';

// const MyForm = () => {
//   // useInput 훅을 사용하여 상태 값 및 핸들러를 가져옴
//   const [name, handleNameChange, setName] = useInput('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitted name:', name);
//     // 여기에서 다른 작업을 수행할 수 있음
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         {/* useInput 훅에서 반환한 핸들러를 입력 필드의 onChange 이벤트에 연결 */}
//         <input type="text" value={name} onChange={handleNameChange} />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default MyForm;