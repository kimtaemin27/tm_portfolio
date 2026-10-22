import { Link } from 'react-router'
import { EMAIL } from '../components/Layout.jsx'
import { DashML, SlackOpsAlert } from '../components/mocks.jsx'
import excelRules from '../assets/images/excel/rules.webp'
import convoyBoard from '../assets/images/convoy/board.webp'
import chartT1 from '../assets/images/model/chart_t1.webp'

const CAREER = [
  { period: '2025.10 ~ 재직 중', company: '(주)준컴퍼니 (카랩)', desc: '알림 발송 기준 수립, 보험 연동·자동 정산, 운영 요청 검토', now: true },
  { period: '2024.11 ~ 2025.04', company: '에이블', desc: '학회·병원 홈페이지 구축, 결제 연동' },
  { period: '2023.04 ~ 2024.10', company: '디자인 위브', desc: '쇼핑몰 구축, 쿠폰·할인 정책 정의' },
  { period: '2022.08 ~ 2023.03', company: '(주)비즈웍스', desc: '급여·연말정산 기준 반영, 업무 자동화' },
]

const SKILLS = [
  ['AI 활용', ['Claude Code', 'Claude CLI']],
  ['데이터', ['SQL (MySQL, Oracle)', '데이터 추출·분석', 'Firebase']],
  ['문서', ['Notion', 'Markdown 웹 문서', '설계·배포·운영 절차']],
  ['개발', ['PHP', 'Laravel', 'Java', 'JavaScript']],
  ['외부 연동', ['토스페이먼츠', 'NICE 본인인증', '카카오 알림톡', '외부 보험 플랫폼 API']],
]


export default function Home() {
  return (
    <>
      <title>김태민 포트폴리오</title>

      <section className="dark">
        <div className="container hero">
          <p className="hero-eyebrow"><span className="dot" />안녕하세요, 김태민입니다</p>
          <h1>
            <span className="grad-text">AI</span>에게 일을 맡기는<br />
            방법을 설계합니다
          </h1>
          <p className="hero-lead">
            <span>4년 차 웹 백엔드 개발자로 일하며 현장의 불편을 시스템으로 바꿔 왔습니다.</span>
            <span>
              사내 요청 정리와 배포 안내에 AI를 도입했고, 개인 프로젝트에서는 AI를 서비스 기능에
              안전하게 붙이는 구조를 설계했습니다.
            </span>
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">프로젝트 보기</a>
            <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <dl className="hero-stats">
            <div><dd>3년 10개월</dd><dt>총 경력</dt></div>
            <div><dd>4곳</dd><dt>회사 경험</dt></div>
            <div><dd>4개</dd><dt>기획부터 실측까지 끝낸 개인 프로젝트</dt></div>
            <div><dd>4건</dd><dt>회사 업무 자동화 사례</dt></div>
          </dl>
        </div>
      </section>

      <section className="block" id="automation-cases">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <p className="eyebrow">Work</p>
              <h2>업무 자동화 사례</h2>
              <p>회사 업무에서 진행한 자동화입니다. 해결한 문제, 구현 내용, 사용 결과 순서로 정리했습니다.</p>
            </div>
          </div>

          <div className="showcase">
            <Link to="/automation" className="case-card reveal">
              <div className="case-media case-media-mock"><SlackOpsAlert /></div>
              <div className="case-body">
                <span className="pill pill-light">회사 업무 · 카랩</span>
                <h3>업무 자동화 사례 4건</h3>
                <p>
                  오류와 주요 이벤트를 Slack으로 바로 알리는 운영 알림, 흩어진 사내 요청을 AI가 정리하는 봇,
                  배포 내용을 현업 문장으로 바꿔 알리는 안내, 외부 보험 플랫폼 연동과 자동 정산을 정리했습니다.
                </p>
                <dl className="case-nums">
                  <div><dd>17건</dd><dt>흩어진 요청을 한 목록으로</dt></div>
                  <div><dd>0건</dd><dt>보험 동기화 오류</dt></div>
                </dl>
                <span className="case-more">자세히 보기</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="block block-tight" id="projects">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <p className="eyebrow">Projects</p>
              <h2>개인 프로젝트</h2>
              <p>프로젝트마다 해결하려던 문제, 내린 판단과 이유, 측정 결과와 한계를 정리했습니다.</p>
            </div>
          </div>

          <div className="showcase">
            <Link to="/model" className="case-card reveal">
              <div className="case-media"><img src={chartT1} alt="" /></div>
              <div className="case-body">
                <span className="pill pill-light">개인 프로젝트 · Claude API 활용</span>
                <h3>작업별 Claude 적정 모델 찾기</h3>
                <p>
                  모델, effort, 프롬프트 버전을 정답셋으로 비교하고 업무별 기본값을 고르는 CLI입니다.
                  선정 규칙은 실행 전에 고정했고, 과금 호출 전에는 예상 비용을 보여 주고 승인받습니다.
                </p>
                <dl className="case-nums">
                  <div><dd>2 / 3</dd><dt>가장 싼 Haiku가 기본값</dt></div>
                  <div><dd>518개</dd><dt>테스트</dt></div>
                  <div><dd>$4.37</dd><dt>실측 비용 (상한 $5)</dt></div>
                </dl>
                <span className="case-more">자세히 보기</span>
              </div>
            </Link>

            <Link to="/convoy" className="case-card reveal">
              <div className="case-media"><img src={convoyBoard} alt="" /></div>
              <div className="case-body">
                <span className="pill pill-light">개인 프로젝트 · Claude Code 활용</span>
                <h3>멀티 에이전트 병렬 실행 엔진</h3>
                <p>
                  Claude Code 계획서의 독립 Task를 여러 AI 작업자에게 동시에 맡기고, 순서와 병합은 코드가 조율하는 실행 엔진입니다.
                  순차 대 병렬을 12회차 실측했습니다.
                </p>
                <dl className="case-nums">
                  <div><dd>53.1%</dd><dt>처음 측정 단축률</dt></div>
                  <div><dd>0건</dd><dt>main 오염</dt></div>
                  <div><dd>0건</dd><dt>조용한 실패</dt></div>
                </dl>
                <span className="case-more">자세히 보기</span>
              </div>
            </Link>

            <Link to="/stock" className="case-card reveal">
              <div className="case-media case-media-mock"><DashML /></div>
              <div className="case-body">
                <span className="pill pill-light">개인 프로젝트 · 토스증권 Open API · Claude CLI</span>
                <h3>금융 API 연동 자동화 시스템</h3>
                <p>
                  공시·뉴스 판정과 보유 종목 리포트에 AI를 접목하면서, 외부 텍스트를 다루는 AI가
                  주문 환경에 닿지 않도록 실행 위치와 권한을 나눠 설계했습니다.
                </p>
                <dl className="case-nums">
                  <div><dd>약 4개월</dd><dt>실계좌 연동 운영 중</dt></div>
                  <div><dd>5분</dd><dt>공시·뉴스 판정 주기</dt></div>
                  <div><dd>하루 2회</dd><dt>리포트 자동 발송</dt></div>
                </dl>
                <span className="case-more">자세히 보기</span>
              </div>
            </Link>

            <Link to="/excel" className="case-card reveal">
              <div className="case-media"><img src={excelRules} alt="" /></div>
              <div className="case-body">
                <span className="pill pill-light">개인 프로젝트 · 서비스 기획</span>
                <h3>ExcelReader</h3>
                <p>
                  AI가 엑셀 정리 규칙을 제안하고, 사람이 승인하고, 코드가 적용하는 서비스입니다.
                  기획 문서 8종과 동작하는 프로토타입, 정답 데이터로 만든 평가까지 직접 설계했습니다.
                </p>
                <dl className="case-nums">
                  <div><dd>24개</dd><dt>정책</dt></div>
                  <div><dd>100%</dd><dt>셀 정확도 (가상 데이터)</dt></div>
                  <div><dd>0회</dd><dt>다음 날 AI 호출</dt></div>
                </dl>
                <span className="case-more">자세히 보기</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="block block-soft">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <p className="eyebrow">How I work</p>
              <h2>이렇게 일합니다</h2>
            </div>
          </div>
          <div className="principles">
            <article className="principle reveal">
              <div className="principle-icon">01</div>
              <h3>현장의 불편에서 시작합니다</h3>
              <p>요청이 채널에 흩어지고, 오류가 CS를 거쳐 늦게 전달되던 상황처럼 현업이 실제로 겪는 불편을 먼저 찾고 시스템으로 바꿨습니다.</p>
            </article>
            <article className="principle reveal">
              <div className="principle-icon">02</div>
              <h3>AI는 판단, 코드는 검증</h3>
              <p>AI에는 분류와 서술을 맡기고, 수집·검증·발송·주문은 코드가 맡게 나눴습니다. AI가 틀릴 수 있다는 것을 전제로 설계합니다.</p>
            </article>
            <article className="principle reveal">
              <div className="principle-icon">03</div>
              <h3>직접 시험해 보고 정합니다</h3>
              <p>차단된다고 설명된 설정도 직접 시험해 실제로 막히지 않는 것을 확인하고 바꿨습니다. 문서보다 측정한 결과를 기준으로 삼습니다.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container home-career">
          <div className="reveal">
            <p className="eyebrow">Career</p>
            <div className="block-head" style={{ marginBottom: 36 }}>
              <div>
                <h2>경력 3년 10개월</h2>
                <p>웹 에이전시, 솔루션 회사, 플랫폼 회사에서 개발과 함께 정책과 기준을 정하는 일을 맡아 왔습니다.</p>
              </div>
            </div>
            <ol className="timeline">
              {CAREER.map((c) => (
                <li key={c.company} className={c.now ? 'now' : undefined}>
                  <div className="tl-period">{c.period}</div>
                  <div className="tl-company">{c.company}</div>
                  <p className="tl-desc">{c.desc}</p>
                </li>
              ))}
            </ol>
            <p style={{ marginTop: 32 }}><Link to="/career" className="case-more" style={{ textDecoration: 'none' }}>회사별 업무 자세히 보기</Link></p>
          </div>
          <div className="reveal">
            <p className="eyebrow">Skills</p>
            <div className="block-head" style={{ marginBottom: 36 }}>
              <div><h2>보유 기술</h2></div>
            </div>
            <div className="skill-groups">
              {SKILLS.map(([group, items]) => (
                <div key={group} className="skill-group">
                  <h3>{group}</h3>
                  <ul className="chips">{items.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dark contact">
        <div className="container reveal">
          <p className="eyebrow">Contact</p>
          <h2>현장의 불편을 시스템으로 바꾸는 일을 하고 싶습니다</h2>
          <p>프로젝트나 경력에 대해 궁금한 점이 있으면 편하게 연락 주세요.</p>
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </section>
    </>
  )
}
