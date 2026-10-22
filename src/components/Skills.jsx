/*
 * 보유 기술. 홈과 경력 페이지가 같이 쓴다.
 * AI는 도구 이름 대신 무엇을 할 줄 아는지로 묶었고, 묶음마다 사이트에 사례가 있다.
 */
const AI_SKILLS = [
  ['서비스에 붙이기', ['Claude API 구조화 출력', 'Message Batches API', 'Claude CLI 헤드리스 호출']],
  ['평가와 비용 관리', ['정답셋 평가 설계', '모델·effort 선택 규칙', '토큰 비용 추정', '프롬프트 캐싱']],
  ['안전 설계', ['프롬프트 주입 방어', 'AI 실행 위치·권한 분리', '도구 차단 직접 검증']],
  ['개발 방식', ['Claude Code', '멀티 에이전트 병렬 실행', '에이전트 교차 리뷰']],
  ['업무 도입', ['Slack 요청 정리 봇', '배포 안내 자동 작성']],
]

const SKILLS = [
  ['데이터', ['SQL (MySQL, Oracle)', '데이터 추출·분석', 'Firebase']],
  ['문서', ['Notion', 'Markdown 웹 문서', '설계·배포·운영 절차']],
  ['개발', ['PHP', 'Laravel', 'Java', 'JavaScript', 'Python']],
  ['외부 연동', [
    '토스페이먼츠 (결제·정산·지급)', '나이스페이', 'NICE 본인인증', '카카오 알림톡', '외부 보험 플랫폼 API', '국세청 연말정산 모듈',
    '토스증권 Open API', 'DART 공시', 'SEC EDGAR', 'Telegram Bot', 'Slack 웹훅',
  ]],
]

export default function Skills() {
  return (
    <div className="skill-groups">
      <div className="skill-group">
        <h3>AI 활용</h3>
        <dl className="skill-sub">
          {AI_SKILLS.map(([label, items]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd><ul className="chips">{items.map((s) => <li key={s}>{s}</li>)}</ul></dd>
            </div>
          ))}
        </dl>
      </div>
      {SKILLS.map(([group, items]) => (
        <div key={group} className="skill-group">
          <h3>{group}</h3>
          <ul className="chips">{items.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      ))}
    </div>
  )
}
