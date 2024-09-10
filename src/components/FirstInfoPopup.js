import React, { useState } from "react";
import { createPortal } from "react-dom";

const FirstInfoPopup = () => {
  const [isOpenInfoPopup, setIsOpenInfoPopup] = useState(false);

  const togglePopup = () => {
    setIsOpenInfoPopup(!isOpenInfoPopup);
  };

  return (
    <>
      <div>
        <button onClick={togglePopup}>테스트</button>

        {isOpenInfoPopup &&
          createPortal(
            <div
              className="popup"
              onClick={togglePopup}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
              role="dialog"
              aria-modal="true"
            >
              <div style={{ cursor: "pointer" }}>
                <p
                  style={{
                    color: "#fff",
                    position: "absolute",
                    right: "30px",
                    top: "50px",
                    width: "30px",
                    height: "2px",
                    transform: "rotate(45deg)",
                    backgroundColor: "#fff",
                  }}
                ></p>
                <p
                  style={{
                    color: "#fff",
                    position: "absolute",
                    right: "30px",
                    top: "50px",
                    width: "30px",
                    height: "2px",
                    transform: "rotate(-45deg)",
                    backgroundColor: "#fff",
                  }}
                ></p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  color: "white",
                  width: "800px",
                  height: "600px",
                }}
              >
                테스트 팝업
              </div>
            </div>,
            window.document.body
          )}
      </div>
    </>
  );
};

export default FirstInfoPopup;
