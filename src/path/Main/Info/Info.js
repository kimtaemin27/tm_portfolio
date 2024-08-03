import './Info.css';
import profileImage from './profile.jpg';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";

export default function Info(){

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    return <>
        <div ref={ref} style={{ width: "100%", height: "100vh" }}>
            <motion.div
                initial={{ opacity: 0, backgroundColor: "#000000" }}
                animate={{ opacity: 1, backgroundColor: inView ? "#F5F5F5" : "#000000" }}
                transition={{ opacity: { duration: 1.5 }, backgroundColor: { duration: 1.5, ease: "easeInOut" } }}
                style={{ width: "100%", height: "100%" }}
            >
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
            </motion.div>
        </div>
    </>
}