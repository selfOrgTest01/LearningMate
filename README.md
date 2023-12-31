# 1조 러닝메이트 프로젝트

반드시 .env파일을 learningmate-server에 넣고 실행시키세요

# 프로젝트 시작

# 12-31 프로젝트 파일명 변경

learningmate-front => frontend
learningmaet-server => backend

db.sql파일 migration로 이동

변수명: carmelCase
컴포넌트: PascalCase
url: kebab-case
db: lower_snake_case
helpers : 1급함수
containers: api 통신들어가는 복잡한로직
constants: 상수를 저장
컴포넌트는 렌더링하는걸로만 쓰임
<br>

# 12-31 front에만 eslint적용
    'linebreak-style': 0,
<br>
    'react/react-in-jsx-scope': 0,
<br>
    'eslint/no-param-reassign': 0,
<br>
    'no-param-reassign': 'off',
<br>
순서대로 <br>
LF, CRLF 구분해야하는 옵션 <br>
react 를 매번 선언해야하는옵션 <br>
함수의 파라미터에 대한 재할당을 금지 옵션<br>
너무 불편해서 꺼버렸어요