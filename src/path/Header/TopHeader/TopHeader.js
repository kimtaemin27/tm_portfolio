import "./TopHeader.css";

export default function TopHeader() {
  const handleClick = (event) => {
    const element = document.getElementById("info_about");
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className="outter">
        <section className="header_outter">
          <div className="name_line">
            <a>TAEMIN PORTFOLIO</a>
          </div>
          <div className="menu_line">
            <a id="header_about" onClick={handleClick}>
              ABOUT ME
            </a>
            <a id="header_project">PROJECTS</a>
            <a id="header_career">CAREER</a>
          </div>
        </section>
      </header>
    </>
  );
}
