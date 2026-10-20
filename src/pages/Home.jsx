import { Link } from 'react-router'
import { EMAIL } from '../components/Layout.jsx'

const PROJECTS = [
  {
    to: '/stock',
    tag: '개인 프로젝트',
    title: '주식 자동매매 시스템',
    desc: 'AI를 서비스 기능에 접목하면서, 외부 텍스트를 다루는 AI가 주문 환경에 닿지 않도록 실행 위치와 권한을 나눠 설계했습니다.',
    chips: ['커밋 1,059개', '테스트 1,353건', 'Claude CLI', 'LightGBM'],
  },
  {
    to: '/automation',
    tag: '회사 업무',
    title: '업무 자동화 사례',
    desc: '흩어진 사내 요청을 AI가 정리하는 봇, 배포 내용을 현업 문장으로 바꿔 알리는 안내, 운영 알림, 외부 보험 플랫폼 연동까지 4건을 정리했습니다.',
    chips: ['Slack 봇', 'Claude CLI', 'Slack 웹훅', '자동 정산'],
  },
  {
    to: '/receipt',
    tag: '진행 중',
    ongoing: true,
    title: '찍고정산',
    desc: '영수증 사진을 AI가 읽고, 품목마다 나눌 사람을 고르면 각자 낼 금액과 송금 목록을 계산하는 서비스입니다. 기획서부터 프로토타입까지 만들고 있습니다.',
    chips: ['기획서', '정책서', '화면설계서', 'Claude API'],
  },
]

export default function Home() {
  return (
    <div className="wrap">
      <title>김태민 포트폴리오</title>
      <section className="hero">
        <h1>개발을 아는 기획자</h1>
        <p className="lead">
          4년 차 웹 백엔드 개발자로 일하며 현장의 불편을 찾아 시스템으로 바꿔 왔고,
          이제 무엇을 왜 만들지 정하는 일을 본업으로 하려 합니다.
        </p>
        <p className="meta">
          총 경력 3년 10개월 (2022.08 ~ 현재) · <Link to="/career">경력 보기</Link>
        </p>
      </section>

      <section className="section" aria-labelledby="projects-title">
        <h2 id="projects-title">프로젝트</h2>
        <div className="cards">
          {PROJECTS.map((p) => (
            <Link key={p.to} to={p.to} className="card">
              <span className={p.ongoing ? 'tag ongoing' : 'tag'}>{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <ul className="chips">
                {p.chips.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <div className="card-foot">자세히 보기</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="contact-title">
        <h2 id="contact-title">연락처</h2>
        <p>
          이메일 <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </section>
    </div>
  )
}
