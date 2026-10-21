import { useEffect, useState } from 'react'
import { NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router'

export const EMAIL = 'ktm3628@naver.com'

const NAV = [
  { to: '/excel', label: 'ExcelReader' },
  { to: '/stock', label: '주식 자동매매' },
  { to: '/automation', label: '업무 자동화' },
  { to: '/career', label: '경력' },
]

/** .reveal 요소가 화면에 들어오면 .in을 붙여 떠오르게 한다 */
function useReveal(pathname) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            observer.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  // 페이지가 바뀌면 모바일 메뉴를 닫는다
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }
  useReveal(pathname)

  return (
    <>
      <a className="skip" href="#main">본문 바로가기</a>
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" end className="home-btn">홈</NavLink>
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? '닫기' : '메뉴'}
          </button>
          <nav id="site-nav" className={open ? 'nav open' : 'nav'}>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to}>{n.label}</NavLink>
            ))}
            <a className="nav-cta" href={`mailto:${EMAIL}`}>연락하기</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <p className="footer-title">함께 일할 기회를 찾고 있습니다</p>
          </div>
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div className="container footer-bottom">© 김태민</div>
      </footer>
      {/* 새로 열린 페이지는 key가 모두 'default'라 주소로 구분한다 */}
      <ScrollRestoration getKey={(loc) => (loc.key === 'default' ? loc.pathname : loc.key)} />
    </>
  )
}
