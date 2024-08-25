import "./Info.css";
import profileImage from "./profile.jpg";

export default function Info() {
  return (
    <>
      <div className="info_title" id="info_about">
        <p>ABOUT ME</p>
      </div>
      <div className="info_outter">
        {/* left */}
        <div className="Info_left">
          <img className="profileImg" alt="proImg" src={profileImage} />
        </div>
        {/* right */}
        <div className="Info_right">
          <span className="info_text">
            <p>이름 : 김태민</p>
            <p>생년월일 : 1997.12.18(28)</p>
            <p>주소 : 경기도 고양시 일산서구</p>
            <p>경력 : 2년</p>
            <p>tel : 010-3633-3628</p>
            <p>e-mail : ktm3628@naver.com</p>
          </span>
          <span className="edu_text">
            <h3>교육사항</h3>
            <ul className="stackSkillWrap">
              {/* 1 */}
              <li>
                <div className="duration">2022.12 ~ 2023.01</div>
                <ul className="twoDepthStack">
                  <li className="twoDepthItem">
                    <p>기관</p>
                    <p>더조은 컴퓨터 아카데미</p>
                  </li>
                  <li className="twoDepthItem">
                    <p>교육과정명</p>
                    <p>swift ui를 통한 앱개발</p>
                  </li>
                </ul>
              </li>
              {/* 2 */}
              <li>
                <div className="duration">2022.01 ~ 2022.07</div>
                <ul className="twoDepthStack">
                  <li className="twoDepthItem">
                    <p>기관</p>
                    <p>코리아정보보안 IT 아카데미</p>
                  </li>
                  <li className="twoDepthItem">
                    <p>교육과정명</p>
                    <p>임베디드 소프트웨어 융합 풀스텍 개발자 양성과정</p>
                  </li>
                </ul>
              </li>
            </ul>
          </span>
          <span className="work_text">
            <h3>경력사항</h3>
            <ul className="workWrap">
              {/* 1 */}
              <li>
                <div className="duration">2023.04 ~ 2024.09</div>
                <ul className="twoDepthStack">
                  <li className="twoDepthItem">
                    <p>회사명</p>
                    <p>(주)아이마케팅</p>
                  </li>
                  <li className="twoDepthItem">
                    <p>직책 / 담당</p>
                    <p>대리 / PHP 개발자</p>
                  </li>
                </ul>
              </li>
              {/* 2 */}
              <li>
                <div className="duration">2022.08 ~ 2023.03</div>
                <ul className="twoDepthStack">
                  <li className="twoDepthItem">
                    <p>회사명</p>
                    <p>(주)비즈웍스</p>
                  </li>
                  <li className="twoDepthItem">
                    <p>직책 / 담당</p>
                    <p>사원 / PHP 개발자</p>
                  </li>
                </ul>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </>
  );
}
