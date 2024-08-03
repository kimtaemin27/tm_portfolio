import './About.css';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";

export default function About(){

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    return <>
        <motion.div 
            initial={{ opacity: 0, backGround: "red" }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
        >
            <div className="About_outter">
                {/* left */}
                <div className="left">
                    <p className="firstRow">풀지 못할 오류는 없다</p>
                    <p className="secondRow">모든 오류에는 해답이 있듯이</p>
                    <p className="elseRow">앞으로 새롭게 맞이하는 문제와 오류들에 제 끈기와 열정으로 도전해 나가겠습니다.</p>
                </div>
            </div>
        </motion.div>
    </>
}