import { Link } from 'react-router'
import {
  Article, Callout, Figure, Fixes, Flow, Metrics, NextProject, Problems,
  ProjectHero, RoleSplit, Section, Table,
} from '../components/ui.jsx'
import figBotlist from '../assets/images/fig_botlist2.webp'
import figAibot from '../assets/images/fig_aibot.webp'
import figDeploy1 from '../assets/images/fig_deploy1.webp'
import figDeploy2 from '../assets/images/fig_deploy2.webp'
import figSlack from '../assets/images/fig_slack.webp'

const CASES = [
  { id: 'request-bot', title: '사내 요청 AI 정리·분배 봇', status: '운영 중' },
  { id: 'deploy-notice', title: 'AI 배포 안내', status: '도입 1개월 미만' },
  { id: 'ops-alert', title: 'Slack 웹훅 운영 알림', status: '운영 중' },
  { id: 'insurance', title: '외부 보험 플랫폼 연동·자동 정산', status: '운영 중' },
]

function CaseIndex() {
  return (
    <nav className="case-index" aria-label="사례 바로가기">
      {CASES.map((c, i) => (
        <a key={c.id} href={`#${c.id}`}>
          <span className="num">CASE {String(i + 1).padStart(2, '0')}</span>
          <b>{c.title}</b>
          <span>{c.status}</span>
        </a>
      ))}
    </nav>
  )
}

function CaseHead({ status, tools }) {
  return (
    <div className="case-head">
      <span className="pill pill-light">{status}</span>
      <ul className="chips">{tools.map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
  )
}

export default function Automation() {
  return (
    <>
      <title>업무 자동화 사례 | 김태민 포트폴리오</title>
      <ProjectHero
        tag="회사 업무 · (주)준컴퍼니(카랩)"
        title="업무 자동화 사례"
        lead="회사에서 진행한 자동화 4건입니다. 1번과 2번은 요청 접수부터 처리 결과 공유까지 이어지는 흐름으로, 개발과 현업 사이의 소통을 AI로 정리한 사례입니다."
        visual={<CaseIndex />}
        stats={[
          ['17건', '흩어진 대기 요청을 한 목록으로'],
          ['5항목', '커밋 8건을 현업용 배포 안내로'],
          ['0건', '보험 동기화 오류'],
          ['159건', '정산 연동 테스트'],
        ]}
      />

      <Article>
        <Section no="01" title="사내 요청 AI 정리·분배 봇" id="request-bot" kicker="CASE 01 · Slack">
          <CaseHead status="운영 중" tools={['Slack 봇', 'Slack 목록', '생성형 AI']} />
          <h3>해결하려던 문제</h3>
          <Problems items={[
            '운영 요청, 오류 제보, 데이터 확인 요청이 여러 슬랙 채팅방에 대화 형태로 들어와, 어떤 요청이 접수됐는지 한곳에서 볼 수 없었습니다.',
            '요청이 일반 대화 사이에 섞여 놓치는 건이 생겼고, 담당이 정해지지 않은 채 며칠씩 남는 요청도 있었습니다.',
            '급한 요청과 그렇지 않은 요청이 구분되지 않아, 들어온 순서나 담당자의 기억에 따라 처리 순서가 정해졌습니다.',
          ]} />

          <h3>판단</h3>
          <Callout><p>요청하는 쪽의 방식은 바꾸지 않기로 했습니다. 현업은 지금처럼 채널에 대화로 요청하고, 정리와 분류는 AI가 맡습니다.</p></Callout>

          <h3>구현 내용</h3>
          <Flow steps={['여러 채널의 요청 대화', 'AI가 요청 단위로 정리·요약', '구분·서비스·우선순위 분류', '매일 09시 대기 현황 공유', '방치·확인 필요 건 알림']} />
          <ul>
            <li>여러 채널의 대화에서 AI가 요청을 찾아 요청 단위로 묶고, 요약과 요청 번호(예: 2026-0167)를 붙입니다.</li>
            <li>요청마다 구분(문의, 개선, 기능추가, 오류), 서비스(카랩, 관리자, 카매니저앱 등), 우선순위(긴급, 높음, 보통)를 분류해 슬랙 목록에 등록하고, 담당 파트를 나눠 각 파트에 할당합니다.</li>
            <li>요청 원문, 원본 메시지 링크, AI 요약, 처리현황(대기, 진행중, 완료)을 목록 한곳에서 관리합니다. 목록에서 완료로 바꾸면 원래 요청 메시지에 완료 체크가 표시됩니다.</li>
            <li>매일 오전 9시에 대기 요청을 우선순위별로 묶어 경과일과 함께 공유하고, 7일 이상 처리되지 않은 요청과 확인이 필요한 요청을 따로 모아 보여 줍니다.</li>
          </ul>

          <h3>결과 <small style={{ fontWeight: 500, color: 'var(--muted)', fontSize: '0.85rem' }}>2026.10.19 기준, 도입 1개월 미만</small></h3>
          <Metrics items={[
            ['17건', '흩어져 있던 대기 요청이 한 목록으로 (긴급 2, 높음 4, 보통 11)'],
            ['14건', '대기 요청 중 관리자 영역에 몰린 건'],
            ['3건', '7일 이상 방치된 요청, 모두 높음 등급'],
          ]} />
          <p>요청이 관리자 영역에 몰려 있고 오래 남은 요청이 모두 높음 등급이라는 점이 드러나, 오래 남은 요청의 우선순위를 다시 조정했습니다.</p>
          <Figure
            images={[
              { src: figBotlist, alt: 'AI가 정리한 슬랙 요청 목록: 처리현황, 구분, 서비스, 우선순위 열 (요청 내용은 가림)' },
              { src: figAibot, alt: '매일 오전 9시 공유되는 대기 요청 17건 현황 (요청 제목은 가림)' },
            ]}
            caption="왼쪽: AI가 정리한 요청 목록(요청 내용은 가림) / 오른쪽: 매일 오전 9시 공유되는 대기 요청 현황(요청 제목은 가림)"
          />

          <h3>다음에 할 일</h3>
          <p>확인이 필요한 건이 15건으로 많았습니다. 요청이 접수될 때 화면 위치, 재현 방법, 기한 같은 필수 정보를 봇이 먼저 되묻도록 보완할 계획입니다.</p>
        </Section>

        <Section no="02" title="AI 배포 안내" id="deploy-notice" kicker="CASE 02 · Slack">
          <CaseHead status="도입 1개월 미만" tools={['Python', 'git hook', 'Claude CLI', 'Slack 웹훅']} />
          <h3>해결하려던 문제</h3>
          <Problems items={[
            '배포된 변경 사항이 개발자가 쓴 커밋 메시지로만 남아, CS·운영 담당자가 무엇이 바뀌었는지 바로 알기 어려웠습니다.',
            '요청 봇으로 접수와 분배는 정리됐지만, 처리 결과를 요청한 쪽에 알리는 일은 여전히 개발자가 따로 해야 했습니다.',
          ]} />

          <h3>구현 내용</h3>
          <Flow steps={['배포 브랜치 push', '원격 반영 확인', '커밋 메시지·변경 파일 수집', 'AI가 현업용 문장으로 정리', '검증 후 Slack 발송']} />
          <ul>
            <li>배포 브랜치에 push하면 원격 저장소에 실제로 반영됐는지 확인한 뒤, 이번 배포에 포함된 커밋만 모아 자동으로 보냅니다.</li>
            <li>커밋에 요청 번호를 적으면 안내에 함께 표시되어 요청 봇의 요청 번호와 이어집니다.</li>
            <li>AI에는 커밋 메시지와 변경 파일 경로만 보내고 코드 내용은 보내지 않습니다.</li>
          </ul>

          <h3>AI가 맡은 일과 코드가 맡은 일</h3>
          <RoleSplit rows={[
            {
              name: '배포 안내',
              ai: '커밋을 화면·기능 기준의 쉬운 문장으로 바꾸고, 기능 추가·개선·오류 수정으로 분류하고, 나눠 올린 같은 변경을 한 항목으로 묶기',
              code: '원격 반영 확인, 이번 배포의 커밋 수집, 빠진 커밋 보완, 없는 요청 번호 제거, 실패 시 원문 발송',
            },
          ]} />

          <h3>오류 방지와 검증</h3>
          <Fixes items={[
            { problem: 'AI가 커밋을 빠뜨리거나 커밋에 없는 요청 번호를 지어낼 수 있습니다.', fix: '빠진 커밋은 원문 메시지로 채우고, 커밋에 없는 요청 번호는 지워서 누락이나 지어낸 내용이 안내에 섞이지 않게 했습니다.' },
            { problem: 'AI 응답이 실패할 수 있습니다.', fix: '실패해도 커밋 메시지 원문으로 안내를 보내고 실패 사유를 함께 표시합니다.' },
            { problem: '커밋 메시지 속 문장이 AI에 대한 지시로 동작할 수 있습니다.', fix: 'AI를 실행할 때 도구를 모두 막고, 빈 작업 폴더와 필요한 환경변수만 넘깁니다.' },
          ]} />
          <p>임시 저장소로 push부터 Slack 수신까지 확인하는 테스트를 포함해 테스트 13건을 작성했습니다.</p>

          <h3>결과</h3>
          <Metrics items={[
            ['5항목', '커밋 8건이 현업이 읽을 수 있는 안내로 정리'],
            ['1건', '화면 변화가 없는 내부 작업은 건수만 표시'],
          ]} />
          <p>배포할 때마다 따로 공유하지 않아도 변경 사항이 Slack에 남습니다.</p>
          <Figure
            images={[
              { src: figDeploy1, alt: '자동 발송된 배포 안내: 개선 4건과 오류 수정 1건' },
              { src: figDeploy2, alt: '자동 발송된 배포 안내: 기능 추가 2건과 오류 수정 1건' },
            ]}
            caption="배포 브랜치에 push한 뒤 자동으로 발송된 배포 안내 예시 (저장소 이름은 가림)"
          />
        </Section>

        <Section no="03" title="Slack 웹훅 운영 알림" id="ops-alert" kicker="CASE 03 · 오류·주요 이벤트·잔액">
          <CaseHead status="운영 중" tools={['PHP', 'Slack 웹훅', '문자 발송']} />
          <h3>해결하려던 문제</h3>
          <Problems items={[
            '선물하기, 카카오톡 알림 발송, 결제처럼 외부 서비스와 연결된 기능의 오류는 고객과 CS팀을 거쳐 개발자에게 전달되어, 그 과정에서 정보가 빠지고 정확한 오류 내용을 파악하기 어려웠습니다.',
            '고객에게 다시 확인하려면 CS팀을 거쳐야 해서 추가 확인도 쉽지 않았습니다.',
            '선물하기 카카오톡 발송은 금액을 미리 충전해 두고 쓰는 방식이라, 잔액이 부족하면 발송이 멈추고 선물하기 기능 오류로 이어졌습니다. 특히 휴일에는 대응이 어려웠습니다.',
          ]} />

          <h3>구현 내용</h3>
          <Flow steps={['오류·이벤트·잔액 부족 발생', '레벨별 구조화 메시지', 'Slack 웹훅 전송', '결제 담당자 문자', '원인 확인·즉시 대응']} />
          <ul>
            <li>운영 중인 서비스에 Slack 웹훅을 연동해, 오류가 나면 발생 시각, 위치, 원인을 바로 Slack으로 보냅니다.</li>
            <li>오류뿐 아니라 할인권 사용, 결제 같은 주요 이벤트도 레벨(INFO, ERROR 등)을 나눠 기록하고, 매니저, 신청번호, 금액, 결제건처럼 확인에 필요한 정보를 메시지에 함께 담아 바로 추적할 수 있게 했습니다.</li>
            <li>충전 잔액이 일정 금액 아래로 내려가면 Slack과 결제 담당자 문자로 동시에 알립니다.</li>
          </ul>

          <h3>결과</h3>
          <div className="decisions" style={{ marginBottom: 24 }}>
            <article className="decision"><h3>고객 문의 없이 바로 수정</h3><p>오류 발생 시각, 위치, 원인을 CS를 거치지 않고 바로 확인해 수정합니다.</p></article>
            <article className="decision"><h3>휴일에도 발송 중단 없음</h3><p>잔액이 바닥나기 전에 결제 담당자가 충전할 수 있어 휴일에도 발송이 멈추지 않습니다.</p></article>
          </div>
          <Figure
            narrow
            images={[{ src: figSlack, alt: 'Slack 운영 알림 예시: 신차패키지 할인권 사용 이벤트, 레벨 INFO (매니저 정보와 번호는 가림)' }]}
            caption="Slack 운영 알림 예시: 신차패키지 할인권 사용 이벤트 (매니저 정보와 번호는 가림)"
          />
        </Section>

        <Section no="04" title="외부 보험 플랫폼 연동·자동 정산" id="insurance" kicker="CASE 04 · API 연동">
          <CaseHead status="운영 중" tools={['PHP', 'Laravel', 'MySQL', '토스페이먼츠 지급 API', '배치']} />
          <h3>해결하려던 문제</h3>
          <Problems items={[
            '외부 보험 플랫폼의 진행 상태(7종)와 사내 진행 단계(9단계)가 서로 달라, 매니저 앱, 어드민, 레거시 화면에서 같은 기준으로 진행 상황을 보기 어려웠습니다.',
            '보험 정산 지급을 자동으로 처리하면서도 중복 송금이 생기지 않아야 했습니다.',
          ]} />

          <h3>구현 내용</h3>
          <Flow steps={['외부 상태 자동 조회 (5분)', '사내 단계로 변환', '상태 변경 이력 기록', '정산 계좌 검증', '자동 지급']} />
          <ul>
            <li>5분마다 변경된 건만 조회하는 상태 동기화 배치를 개발했습니다.</li>
            <li>외부 상태 7종을 사내 9단계로 바꾸는 매핑 규칙을 설계했고, 사내에서만 쓰는 단계(정산, 취소)는 덮어쓰지 않도록 보호했습니다. 단계가 누락되면 이력을 보완하는 규칙도 세웠습니다.</li>
            <li>토스페이먼츠 지급 API로 정산 계좌 등록, 계좌 검증, 자동 지급까지 이어지는 흐름을 구현했습니다.</li>
            <li>견적 데이터는 개인정보를 제거한 뒤 저장하고, 상태가 바뀔 때마다 이력을 기록합니다.</li>
          </ul>

          <h3>오류 방지와 검증</h3>
          <Fixes items={[
            { problem: '송금 후 처리가 실패하면 지급 기록이 사라질 수 있습니다.', fix: '송금 ID를 상태 변경보다 먼저 기록해, 이후 처리가 실패해도 지급 이력이 남게 했습니다.' },
            { problem: '송금은 됐는데 후속 처리만 실패한 건을 다시 송금할 위험이 있습니다.', fix: '이런 건을 일반 실패와 나눠 안내해 같은 건을 다시 송금하지 않도록 막았습니다.' },
            { problem: '같은 건을 동시에 처리하면 충돌할 수 있습니다.', fix: '조건부 업데이트를 적용했습니다.' },
          ]} />

          <h3>결과</h3>
          <Metrics items={[
            ['0건', '운영 반영 후 동기화 오류'],
            ['159건', '권한, 동시성, 쿼리 수 테스트'],
            ['3개 화면', '매니저 앱, 어드민, 레거시에 같은 상태 기준'],
          ]} />
        </Section>

        <Section title="그 외 외부 서비스 연동 경험" id="others">
          <Table
            caption="그 외 외부 서비스 연동 경험"
            head={['연동 대상', '내용']}
            rows={[
              ['토스페이먼츠 결제', '국제학술대회 사전등록·스폰서십 결제, 결제 상태별 안내 메일 (에이블)'],
              ['카카오 알림톡', '회원·견적 알림 발송 (카랩)'],
              ['NICE 본인인증', '회원 본인인증 (카랩)'],
              ['국세청 연말정산 모듈', '자료 판독, 세액 계산, 제출 파일 생성 (비즈웍스)'],
            ]}
          />
          <p>개인 프로젝트는 <Link to="/model">작업별 Claude 적정 모델 찾기</Link>부터 따로 정리했습니다.</p>
        </Section>
      </Article>

      <NextProject to="/model" label="다음 프로젝트" title="작업별 Claude 적정 모델 찾기" desc="개인 프로젝트 · Claude API 활용" />
    </>
  )
}
