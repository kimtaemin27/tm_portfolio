/*
 * 코드 구조 섹션. 저장소는 공개하지 않고, 폴더 구조와 핵심 발췌만 보여 준다.
 * 발췌는 src/code/ 아래 파일을 ?raw 로 읽는다. 원본에서 줄을 줄였을 뿐 동작은 바꾸지 않는다.
 */
import { useState } from 'react'

/** 폴더 구조: [경로, 설명] 묶음. 그룹 제목으로 층을 나눈다 */
export function CodeTree({ groups }) {
  return (
    <div className="code-tree">
      {groups.map(({ title, note, rows }) => (
        <div key={title} className="code-tree-group">
          <p className="code-tree-title">{title}{note && <span> · {note}</span>}</p>
          <ul>
            {rows.map(([path, desc]) => (
              <li key={path}><code>{path}</code><span>{desc}</span></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const KEYWORDS = new Set([
  'def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'is',
  'None', 'True', 'False', 'raise', 'import', 'from', 'as', 'try', 'except', 'with', 'lambda', 'pass',
])
// 주석 · 삼중따옴표 문자열 · f/r 접두 문자열 · 데코레이터 · 숫자 · 낱말 순서로 자른다
const TOKEN = /(#[^\n]*)|("""[\s\S]*?""")|([rf]?"(?:\\.|[^"\\\n])*"|[rf]?'(?:\\.|[^'\\\n])*')|(@\w+)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)/g

function highlight(src) {
  const out = []
  let last = 0
  let prevDef = false
  for (const m of src.matchAll(TOKEN)) {
    if (m.index > last) out.push(src.slice(last, m.index))
    const [text, comment, doc, str, deco, num, word] = m
    let cls
    if (comment) cls = 'c'
    else if (doc || str) cls = 's'
    else if (deco) cls = 'd'
    else if (num) cls = 'n'
    else if (word && KEYWORDS.has(word)) cls = 'k'
    else if (word && prevDef) cls = 'f'
    out.push(cls ? <span key={m.index} className={`tk-${cls}`}>{text}</span> : text)
    prevDef = word === 'def' || word === 'class'
    last = m.index + text.length
  }
  out.push(src.slice(last))
  return out
}

/** 핵심 코드 탭: { file, title, why, code } */
export function CodeTabs({ items }) {
  const [i, setI] = useState(0)
  const cur = items[i]
  return (
    <div className="code-tabs">
      <div className="code-tab-list" role="tablist" aria-label="핵심 코드">
        {items.map((it, k) => (
          <button
            key={it.file}
            type="button"
            role="tab"
            aria-selected={k === i}
            className={k === i ? 'on' : undefined}
            onClick={() => setI(k)}
          >
            {it.title}
          </button>
        ))}
      </div>
      <div className="code-panel" role="tabpanel">
        <p className="code-why">{cur.why}</p>
        <div className="code-block">
          <div className="code-file">{cur.file}</div>
          <pre><code>{highlight(cur.code.trimEnd())}</code></pre>
        </div>
      </div>
    </div>
  )
}
