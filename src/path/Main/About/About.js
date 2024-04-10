import './About.css'
// import main_image from './../image/main_page/main_page_image.png'

export default function About(){
    const mainPageImageFirst = "https://kimtaemin27.github.io/tm_portfolio/src/assets/image/main_page/main_page_image.png"
    return <>
        <div class="information_outter">
            <div class="main_text_line">
                <a class="main_text">한계를 뛰어넘어</a>
            </div>
            <div class="main_name_line">
                <div class="main_name_outter">
                    <a class="main_name">-김태민-</a>
                    <br/>
                    <a class="main_name">기획자 포트폴리오</a>
                </div>
            </div>
            <img src={ mainPageImageFirst }/>
        </div>
    </>
}