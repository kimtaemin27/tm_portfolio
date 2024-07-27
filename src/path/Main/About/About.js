import './About.css';
import profileImage from './profile.jpg';

export default function About(){
    const mainPageImageFirst = "https://kimtaemin27.github.io/tm_portfolio/src/assets/image/main_page/main_page_image.png"
    return <>
        <div className="information_outter">
            {/* left */}
            <div className="left">
                <p className="firstRow">풀지 못할 오류는 없다</p>
                <p className="secondRow">testtesttest</p>
            </div>
            {/* right */}
            <div className="right">
                <img className="profileImg" alt="proImg" src={profileImage}/>
            </div>
        </div>
    </>
}