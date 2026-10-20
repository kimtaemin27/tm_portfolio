import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

/* ───────── 프로젝트 상단 (어두운 영역) ───────── */

/**
 * 프로젝트 페이지 첫 화면.
 * meta: [['기간', '2026.06 ~ 진행 중'], ...], stats: [['1,059', '커밋'], ...]
 * cover: { src, alt } 대표 화면, visual: 이미지 대신 넣을 요소
 */
export function ProjectHero({ tag, ongoing, title, lead, stats, meta, chips, cover, visual }) {
  return (
    <header className="p-hero">
      <div className={cover || visual ? 'container p-hero-grid' : 'container p-hero-grid solo'}>
        <div className="p-hero-text">
          <span className={ongoing ? 'pill pill-warn' : 'pill'}>{tag}</span>
          <h1>{title}</h1>
          <p className="p-hero-lead">{lead}</p>
          {meta && (
            <dl className="p-meta">
              {meta.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          )}
          {chips && (
            <ul className="chips chips-dark">
              {chips.map((c) => <li key={c}>{c}</li>)}
            </ul>
          )}
        </div>
        {(cover || visual) && (
          <div className="p-hero-visual">
            {cover ? <BrowserFrame {...cover} /> : visual}
          </div>
        )}
      </div>
      {stats && (
        <div className="container">
          <dl className="p-stats">
            {stats.map(([value, label]) => (
              <div key={label}><dd>{value}</dd><dt>{label}</dt></div>
            ))}
          </dl>
        </div>
      )}
    </header>
  )
}

/** 화면 캡처를 창 모양 틀에 넣어 보여 준다 */
export function BrowserFrame({ src, alt }) {
  return (
    <div className="frame">
      <div className="frame-bar" aria-hidden="true"><i /><i /><i /></div>
      <Zoomable src={src} alt={alt} bare />
    </div>
  )
}

/* ───────── 본문 틀 ───────── */

/** 왼쪽 목차 + 오른쪽 본문 */
export function Article({ children }) {
  return (
    <div className="container article">
      <Toc />
      <div className="article-body">{children}</div>
    </div>
  )
}

/** 번호가 붙은 본문 섹션 */
export function Section({ no, title, kicker, id, children }) {
  return (
    <section className="section reveal" id={id ?? (no ? `s${no}` : undefined)} data-toc={title}>
      <div className="section-head">
        {no && <span className="section-no" aria-hidden="true">{no}</span>}
        <div>
          {kicker && <p className="kicker">{kicker}</p>}
          <h2>{title}</h2>
        </div>
      </div>
      {children}
    </section>
  )
}

/** 페이지 목차. data-toc가 있는 섹션을 읽고 지금 위치를 표시한다 */
export function Toc() {
  const [items, setItems] = useState([])
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const sections = [...document.querySelectorAll('main [data-toc][id]')]
    // 본문 DOM이 그려진 뒤에야 제목을 읽을 수 있어 effect 안에서 한 번 채운다
    // oxlint-disable-next-line react/set-state-in-effect
    setItems(sections.map((el) => ({ id: el.id, label: el.dataset.toc })))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setCurrent(visible[0].target.id)
      },
      { rootMargin: '-90px 0px -65% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (!items.length) return <div />
  return (
    <nav className="toc" aria-label="목차">
      <p className="toc-title">목차</p>
      <ol>
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={current === it.id ? 'location' : undefined}>
              <span>{String(i + 1).padStart(2, '0')}</span>{it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* ───────── 시각 요소 ───────── */

/** 번호가 붙은 단계 흐름 */
export function Flow({ steps, label }) {
  return (
    <ol className="flow" aria-label={label ?? '처리 흐름'}>
      {steps.map((s, i) => (
        <li key={s}>
          <span className="flow-no">{i + 1}</span>
          <span className="flow-text">{s}</span>
        </li>
      ))}
    </ol>
  )
}

/** 판단 카드 묶음. items: [{ title, body, alt }] */
export function Decisions({ items }) {
  return (
    <div className="decisions">
      {items.map((d, i) => (
        <article key={d.title} className="decision">
          <span className="decision-no">{String(i + 1).padStart(2, '0')}</span>
          <h3>{d.title}</h3>
          <p>{d.body}</p>
          {d.alt && (
            <div className="decision-alt">
              <strong>검토한 대안</strong>
              <p>{d.alt}</p>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

/** AI와 코드의 역할 비교. rows: [{ name, ai, code }] */
export function RoleSplit({ rows }) {
  return (
    <div className="roles">
      <div className="roles-head" aria-hidden="true">
        <span />
        <span className="role-ai">AI가 맡는 일</span>
        <span className="role-code">코드가 맡는 일</span>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="roles-row">
          <h3>{r.name}</h3>
          <div className="role-cell role-ai"><span className="role-label">AI</span>{r.ai}</div>
          <div className="role-cell role-code"><span className="role-label">코드</span>{r.code}</div>
        </div>
      ))}
    </div>
  )
}

/** 문제와 수정 카드. items: [{ problem, fix }] */
export function Fixes({ items }) {
  return (
    <div className="fixes">
      {items.map((f) => (
        <article key={f.problem} className="fix">
          <div className="fix-problem"><span>문제</span><p>{f.problem}</p></div>
          <div className="fix-solution"><span>수정</span><p>{f.fix}</p></div>
        </article>
      ))}
    </div>
  )
}

/** 결과 숫자 강조. items: [[값, 설명]] */
export function Metrics({ items }) {
  return (
    <dl className="metrics">
      {items.map(([v, l]) => (
        <div key={l}><dd>{v}</dd><dt>{l}</dt></div>
      ))}
    </dl>
  )
}

/** 강조 문단 */
export function Callout({ children }) {
  return <div className="callout">{children}</div>
}

/** 문제 목록 */
export function Problems({ items }) {
  return (
    <ul className="problems">
      {items.map((p) => <li key={p}>{p}</li>)}
    </ul>
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
function Zoomable({ src, alt, bare }) {
  const dialog = useRef(null)
  return (
    <>
      <button type="button" className={bare ? 'zoom zoom-bare' : 'zoom'} onClick={() => dialog.current.showModal()}>
        <img src={src} alt={alt} loading="lazy" />
        <span className="zoom-hint" aria-hidden="true">크게 보기</span>
        <span className="sr-only">크게 보기</span>
      </button>
      <dialog ref={dialog} className="lightbox" onClick={() => dialog.current.close()} aria-label={alt}>
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

/** 다음 프로젝트로 넘어가는 큰 카드 */
export function NextProject({ to, label, title, desc }) {
  return (
    <div className="container">
      <Link to={to} className="next reveal">
        <span className="next-label">{label}</span>
        <span className="next-title">{title}</span>
        {desc && <span className="next-desc">{desc}</span>}
        <span className="next-arrow" aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
