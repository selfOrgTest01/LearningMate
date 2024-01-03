import React, { useState } from 'react';
import Chat from './Chat'; // Chat 컴포넌트의 경로에 맞게 수정하세요

function ParentComponent() {
  const [dynamicValue, setDynamicValue] = useState(/* 초기값 */);

  return (
    <div>
      {/* 다른 UI 또는 로직 ... */}
      <button onClick={() => setDynamicValue(19)}>
        Set Dynamic Value
      </button>

      {/* Chat 컴포넌트에 동적으로 설정된 값을 props로 전달 */}
      <Chat dynamicValue={dynamicValue} />
    </div>
  );
}

export default ParentComponent;