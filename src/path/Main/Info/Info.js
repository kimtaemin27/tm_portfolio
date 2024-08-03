import './Info.css';
import profileImage from './profile.jpg';

export default function Info(){
    return <>
        <div className="info_title">
            <p>ABOUT ME</p>
        </div>
        <div className="info_outter" id="info_about">
            {/* left */}
            <div className="Info_left">
                <img className="profileImg" alt="proImg" src={profileImage}/>
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
                    <ul>
                        <li>
                            <h3>교육사항</h3>
                            <p>코리아 it 정보교육 기관</p>
                            
                        </li>
                    </ul>
                </span>
            </div>
        </div>
    </>
}