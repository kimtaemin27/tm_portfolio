import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

/** 프로젝트 페이지 상단: 구분 태그, 제목, 한 줄 요약, 핵심 수치, 개요 */
export function PageHead({ tag, title, lead, stats, children }) {
  return (
    <header className="page-head">
      {tag && <p className="tag">{tag}</p>}
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {stats && (
        <dl className="stats">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {children}
    </header>
  )
}

/** 번호가 붙은 본문 섹션 */
export function Section({ no, title, id, children }) {
  return (
    <section className="section" id={id ?? (no ? `s${no}` : undefined)}>
      <h2>
        {no && <span className="no">{no}</span>}
        {title}
      </h2>
      {children}
    </section>
  )
}

/** 페이지 목차. 본문의 번호 섹션 제목을 읽어 만들고, 읽고 있는 위치를 표시한다 */
export function Toc() {
  const [items, setItems] = useState([])
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const sections = [...document.querySelectorAll('main .section[id]')]
    // 본문 DOM이 그려진 뒤에야 제목을 읽을 수 있어 effect 안에서 한 번 채운다
    // oxlint-disable-next-line react/set-state-in-effect
    setItems(sections.map((el) => ({
      id: el.id,
      label: el.querySelector('h2')?.textContent.replace(/^\d+/, '').trim(),
    })))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setCurrent(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (!items.length) return null
  return (
    <nav className="toc" aria-label="목차">
      <p className="toc-title">목차</p>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={current === it.id ? 'location' : undefined}>{it.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** 단계 흐름도. 화살표는 CSS로 그린다 */
export function Flow({ steps, label }) {
  return (
    <ol className="flow" aria-label={label ?? '처리 흐름'}>
      {steps.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ol>
  )
}

/** 좁은 화면에서 가로로 스크롤되는 표 */
export function Table({ head, rows, caption }) {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label={caption ?? '표'}>
      <table className={head.length >= 3 ? 'wide' : undefined}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** 이미지 한 장. 누르면 크게 본다 */
function Zoomable({ src, alt }) {
  const dialog = useRef(null)
  return (
    <>
      <button type="button" className="zoom" onClick={() => dialog.current.showModal()}>
        <img src={src} alt={alt} loading="lazy" />
        <span className="sr-only">크게 보기</span>
      </button>
      <dialog
        ref={dialog}
        className="lightbox"
        onClick={() => dialog.current.close()}
        aria-label={alt}
      >
        <img src={src} alt={alt} />
        <button type="button" className="lightbox-close" aria-label="닫기">닫기</button>
      </dialog>
    </>
  )
}

/** 그림과 설명. images는 [{src, alt}] 배열이며 2장이면 나란히 놓는다 */
export function Figure({ images, caption, narrow, diagram }) {
  const cls = ['figure', images.length > 1 && 'pair', narrow && 'narrow', diagram && 'diagram'].filter(Boolean).join(' ')
  return (
    <figure className={cls}>
      <div className="figure-images">
        {images.map((img) => <Zoomable key={img.src} {...img} />)}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** 펼쳐 보는 영역 */
export function More({ summary, children }) {
  return (
    <details className="more">
      <summary>{summary}</summary>
      <div className="more-body">{children}</div>
    </details>
  )
}

/** 다음 페이지로 넘어가는 링크 */
export function NextLink({ to, children }) {
  return (
    <p className="next-link">
      <Link to={to}>{children}</Link>
    </p>
  )
}
