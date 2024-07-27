import './TopHeader.css'


export default function TopHeader() {
    return <>
        <header className="outter">
            <section className="header_outter">
                <div className="name_line">
                    <a>TAEMIN PORTFOLIO</a>
                </div>
                <div className="menu_line">
                    <a id="header_about">ABOUT ME</a>
                    <a id="header_project">PROJECTS</a>
                    <a id="header_career">CAREER</a>
                </div>
            </section>
        </header>
    </>
}

