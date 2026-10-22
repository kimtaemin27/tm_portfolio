/*
 * 실제 화면 캡처 대신 코드로 다시 그린 예시 화면.
 * 캡처는 해상도가 낮고 회사 업무 내용이 드러나서, 형식만 살리고 내용은 일반화한 가상 값으로 채운다.
 */

/** 예시 화면과 설명. 캡처가 아니므로 확대 없이 그대로 보여 준다 */
export function MockFigure({ children, caption, narrow, pair }) {
  const cls = ['figure', 'mock-figure', narrow && 'narrow', pair && 'pair'].filter(Boolean).join(' ')
  return (
    <figure className={cls}>
      <div className="figure-images">{children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** 창 모양 틀 (첫 화면 대표 이미지 자리) */
export function MockFrame({ children, label }) {
  return (
    <div className="frame mock-frame" role="img" aria-label={label}>
      <div className="frame-bar" aria-hidden="true"><i /><i /><i /></div>
      {children}
    </div>
  )
}

/* ───────── Slack ───────── */

function SlackMessage({ app, time, children }) {
  return (
    <div className="mk-slack">
      <div className="mk-slack-avatar" aria-hidden="true" />
      <div className="mk-slack-main">
        <div className="mk-slack-head"><b>{app}</b><span className="mk-app-tag">앱</span><span className="mk-muted">{time}</span></div>
        {children}
      </div>
    </div>
  )
}

function SlackAttachment({ level, title, fields }) {
  return (
    <div className={`mk-attach mk-${level.toLowerCase()}`}>
      <div className="mk-attach-title">{title}</div>
      <dl className="mk-fields">
        {fields.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
      <div className="mk-level">Level <b>{level}</b></div>
    </div>
  )
}

/** Slack 웹훅 운영 알림: 오류와 정상 이벤트 */
export function SlackOpsAlert() {
  return (
    <div className="mk mk-dark" role="img" aria-label="Slack 운영 알림 예시: 외부 연동 응답 오류(ERROR)와 결제 이벤트 처리(INFO)">
      <SlackMessage app="Ops Alert" time="오전 10:33">
        <SlackAttachment
          level="ERROR"
          title="❌  외부 연동 응답 오류"
          fields={[['위치', '알림 발송'], ['원인', '응답 시간 초과'], ['요청번호', '1042']]}
        />
        <SlackAttachment
          level="INFO"
          title="✅  결제 이벤트 처리"
          fields={[['요청번호', '1043'], ['금액', '30,000원']]}
        />
      </SlackMessage>
    </div>
  )
}

const DEPLOY_NOTICES = {
  first: {
    groups: [
      ['개선', ['상세 화면을 열 때 진행 정보가 바로 반영되도록 개선', '견적 화면 표에 금액 항목 추가']],
      ['오류 수정', ['파일 업로드 시 정해진 위치가 아닌 곳에 저장되던 문제 수정']],
    ],
    foot: '커밋 8건 · 화면 변화 없는 내부 작업 1건은 생략',
  },
  second: {
    groups: [
      ['기능 추가', ['발급이 누락된 항목을 다시 발급하는 기능 추가', '발급·사용 시 Slack 알림 추가']],
      ['오류 수정', ['완료 처리 시 발급되지 않던 문제 수정']],
    ],
    foot: '커밋 4건',
  },
}

/** AI 배포 안내 Slack 메시지 */
export function SlackDeployNotice({ variant = 'first' }) {
  const n = DEPLOY_NOTICES[variant]
  return (
    <div className="mk mk-dark" role="img" aria-label={`배포 안내 예시: ${n.groups.map(([g, items]) => `${g} ${items.length}건`).join(', ')}`}>
      <div className="mk-deploy-title">🚀 배포 안내 · service (main) · 2026-10-19 16:25</div>
      {n.groups.map(([g, items]) => (
        <div key={g} className="mk-deploy-group">
          <b>{g}</b>
          <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      ))}
      <div className="mk-deploy-foot">{n.foot}</div>
    </div>
  )
}

/* ───────── 텔레그램 ───────── */

/** 공시 판정 악재 알림 */
export function TelegramJudgeAlert() {
  return (
    <div className="mk mk-tg" role="img" aria-label="텔레그램 악재 감지 알림 예시: 공시 제목, 점수, 확신도, 판정 사유">
      <div className="mk-tg-bubble">
        <p><b>📰 악재 감지</b> [샘플전자]</p>
        <p>공시 · 주요사항보고서(유상증자결정)</p>
        <p>점수 -0.7 · 확신 60%</p>
        <p>유상증자 결정으로 신주 발행에 따른 지분 희석 요인</p>
        <p className="mk-tg-gap"><b>매매에는 반영하지 않습니다</b> — 판단 참고용입니다.</p>
        <span className="mk-tg-time">3:15 PM</span>
      </div>
    </div>
  )
}

/* ───────── PC 대시보드 ───────── */

const NEWS = [
  ['10-16 05:30', '샘플전자, 차세대 제품 공개…신규 수요 기대', '경제매체 A', '호재 · 기타'],
  ['10-15 16:44', '샘플전자, 업계 협의체 부회장사 합류', '경제매체 B', '중립 · 기타'],
  ['10-16 17:54', '관련 업종 전반 강세…수급 개선 기대', '경제매체 C', '중립 · 시황'],
  ['10-16 16:38', '하루 만에 반등한 업종, 아직 안심 이른 이유', '경제매체 A', '중립 · 시황'],
  ['10-16 16:28', '대외 변수 속 관련주 일제히 상승', '통신사 D', '중립 · 시황'],
  ['10-16 10:57', '대형주 고점 대비 하락폭 비교', '경제매체 E', '중립 · 시황'],
]

const DISCLOSURES = [
  ['2026-10-14', '단일판매·공급계약체결', '중립 · 수주'],
  ['2026-10-01', '결산실적공시예고', '중립 · 기타'],
]

/** 종목 인텔: 뉴스와 공시마다 AI 판정 결과 */
export function DashIntel() {
  return (
    <div className="mk mk-dash mk-intel" role="img" aria-label="PC 대시보드 종목 인텔 예시: 뉴스와 공시마다 AI 판정 결과(호재·악재·중립, 분류)가 붙어 있다">
      <div className="mk-intel-head">뉴스 (클릭 → 기사)</div>
      <ul className="mk-intel-list">
        {NEWS.map(([t, title, src, tag]) => (
          <li key={title}>
            <span className="mk-muted">{t}</span>
            <span className="mk-intel-title">{title}</span>
            <span className="mk-muted">· {src}</span>
            <span className={tag.startsWith('호재') ? 'mk-tag mk-tag-good' : 'mk-tag'}>[{tag}]</span>
          </li>
        ))}
      </ul>
      <div className="mk-intel-head">공시 (클릭 → DART 원문)</div>
      <ul className="mk-intel-list">
        {DISCLOSURES.map(([t, title, tag]) => (
          <li key={title}>
            <span className="mk-muted">{t}</span>
            <span className="mk-intel-title">{title}</span>
            <span className="mk-tag">[{tag}]</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ML_ROWS = [
  ['Sample Freight (SMPF)', '$198.34', '$208.26', 80],
  ['Sample Aero (SMPA)', '$1,192.60', '$1,252.23', 78],
  ['Sample Climate (SMPC)', '$389.06', '$408.51', 78],
  ['Sample Water (SMPW)', '$112.81', '$118.45', 75],
  ['Sample Goods (SMPG)', '$68.07', '$71.47', 75],
  ['Sample Insure (SMPI)', '$68.48', '$71.90', 75],
]

const ML_MENU = ['대시보드', '통계 & AI', '종목 스크리너', '종목 인텔', '장기 차트 분석', '스윙 도달확률 예측']

/** 예측 모델 화면: LightGBM 도달확률 */
export function DashML() {
  return (
    <div className="mk mk-dash mk-ml" role="img" aria-label="PC 대시보드 예측 모델 예시: 종목별 LightGBM 도달확률 (가상 종목)">
      <aside className="mk-ml-side">
        <div className="mk-ml-brand">Stock Bot</div>
        {ML_MENU.map((m) => <div key={m} className={m.startsWith('스윙') ? 'mk-ml-menu on' : 'mk-ml-menu'}>{m}</div>)}
      </aside>
      <div className="mk-ml-main">
        <div className="mk-ml-title">스윙 도달확률 예측</div>
        <div className="mk-muted mk-ml-sub">실거래 매수와 무관한 순수 검증용 기록</div>
        <table>
          <thead><tr><th>#</th><th>종목</th><th>예측시점가</th><th>목표가</th><th>도달확률</th></tr></thead>
          <tbody>
            {ML_ROWS.map(([name, p, t, prob], i) => (
              <tr key={name}>
                <td>{i + 1}</td><td>{name}</td><td>{p}</td><td>{t}</td>
                <td><span className="mk-bar"><i style={{ width: `${prob}%` }} /></span>{prob}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
