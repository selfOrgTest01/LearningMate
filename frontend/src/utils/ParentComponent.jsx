import React, { useState } from 'react';
import Chat from './Chat'; // Chat 컴포넌트의 경로에 맞게 수정하세요

function ParentComponent() {
  const [dynamicValue, setDynamicValue] = useState(/* 초기값 */);

  return (
    <div>
      <button onClick={() => setDynamicValue(19)}>Set Dynamic Value</button>
      <Chat dynamicValue={dynamicValue} />
    </div>
  );
}

export default ParentComponent;
