import { useState } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router'

export const EMAIL = 'ktm3628@naver.com'

const NAV = [
  { to: '/stock', label: '주식 자동매매' },
  { to: '/automation', label: '업무 자동화' },
  { to: '/receipt', label: '찍고정산' },
  { to: '/career', label: '경력' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  // 페이지가 바뀌면 모바일 메뉴를 닫는다
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <>
      <a className="skip" href="#main">본문 바로가기</a>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link to="/" className="brand">김태민</Link>
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">메뉴</span>
            <span aria-hidden="true">{open ? '닫기' : '메뉴'}</span>
          </button>
          <nav id="site-nav" className={open ? 'nav open' : 'nav'}>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to}>{n.label}</NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <p>김태민 · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
      </footer>
      {/* 새로 열린 페이지는 key가 모두 'default'라 주소로 구분한다 */}
      <ScrollRestoration getKey={(loc) => (loc.key === 'default' ? loc.pathname : loc.key)} />
    </>
  )
}
