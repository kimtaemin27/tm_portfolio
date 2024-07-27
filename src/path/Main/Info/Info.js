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
                <span className="info_Text">
                    <p>이름 : 김태민</p>
                </span>
            </div>
        </div>
    </>
}