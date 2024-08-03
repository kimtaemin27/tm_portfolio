import "./App.css";
import styled from "styled-components";
import TopHeader from "./path/Header/TopHeader";
import About from "./path/Main/About";
import Info from "./path/Main/Info";

function App() {
  return (
    <>
      <TopHeader></TopHeader>
      <About></About>
      <Info></Info>
      <Test>sss</Test>
    </>
  );
}
// class(x) -> className={}

const Test = styled.div`
  height: 700px;
  width: 800px;
  background-color: blue;
`;
// const Test = styled.div`
//       height: 700px;
//       width: 800px;
//       background-color: blue;
//     `

export default App;

// index 페이지
// 상위태그로 감싸져 있어야 함 빈 태그로 상위 태그 감싸기<></>
// 배포 명령어 : npm run deploy >> 실행 후 깃허브 레파지토리 접속 > actions > workflows 선택 후 build 확인할 것
// 페이지 띄울 때(LOCAL) : npm run start
