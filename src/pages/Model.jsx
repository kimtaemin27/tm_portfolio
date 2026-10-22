import { Link } from 'react-router'
import {
  Article, Callout, DocList, Figure, Flow, Metrics, NextProject, ProjectHero, Section, Table,
} from '../components/ui.jsx'
import { CodeTabs, CodeTree } from '../components/code.jsx'
import selectionCode from '../code/model/selection.py?raw'
import gateCode from '../code/model/gate.py?raw'
import runnerCode from '../code/model/runner.py?raw'
import chartT1 from '../assets/images/model/chart_t1.webp'
import chartT2 from '../assets/images/model/chart_t2.webp'

const doc = (name) => `${import.meta.env.BASE_URL}docs/model/${name}`

export default function Model() {
  return (
    <>
      <title>작업별 Claude 적정 모델 찾기 | 김태민 포트폴리오</title>
      <ProjectHero
        tag="개인 프로젝트 · Claude API 활용"
        title="작업별 Claude 적정 모델 찾기"
        lead="업무에 Claude를 붙일 때 모델, effort, 프롬프트 버전을 정답셋으로 비교하고 업무별 기본값을 고르는 CLI 도구입니다. 과금 호출 전에는 예상 비용을 보여 주고 승인을 받습니다."
        meta={[
          ['기간', '약 1주'],
          ['인원', '1인 (문제 정의, 정책 설계, 구현, 실측, 리포트)'],
          ['산출물', '기획서, 요구사항정의서, 정책서, 데이터·결과 규격서, 정보구조·흐름도, CLI 화면설계서, 기능명세서, 시스템·AI 설계서, 실측 리포트'],
        ]}
        chips={['Python', 'SQLite', 'Anthropic 일괄 처리 API', 'pytest']}
        cover={{ src: chartT1, alt: '문의 분류 업무의 정확도와 1,000건당 비용 그래프. 선정된 기본값은 Haiku max v2' }}
        stats={[
          ['7개', '명령'],
          ['3개 · 13개', '업무 · 비교 조합'],
          ['518개', '테스트 (API 호출 없이 실행)'],
          ['$4.37', '실측 비용 (상한 $5)'],
        ]}
      />

      <Article>
        <Section no="01" title="문제 정의">
          <Callout>
            <p>업무에 Claude를 붙일 때 "어느 모델에, effort는 얼마로, 프롬프트는 어떤 버전으로" 정할지 근거 없이 정하는 경우가 많다.</p>
          </Callout>
          <p>
            기본값은 감이나 한두 건 시험으로 정해지고, 모델 3종 × effort 5단계 × 프롬프트 2버전 × 업무 3개 = 90가지 조합을 손으로 다 돌릴 수도 없습니다.
            평가 자체에도 돈이 들기 때문에 비용을 미리 알지 못하면 평가를 건너뛰게 됩니다.
          </p>
          <p>
            그래서 기획 질문을 이렇게 세웠습니다. 업무별 정답셋으로 조합을 한꺼번에 비교하면서, 평가 비용은 미리 알고 통제하고, 기본값은 근거와 함께 고를 수 있는가.
          </p>
          <p>
            현재 대안은 감과 한두 건 시험, 콘솔에서 수작업 비교, 범용 평가 프레임워크를 정답셋 전체 채점, 비용 사전 통제, 재현성, 결정 근거 기록 네 가지 기준으로 비교했습니다.
            범용 프레임워크는 범위가 넓어 "이 업무의 기본값은 이것"이라는 결정까지 이어 주지 않는다고 보고, Claude 모델끼리 비교해 결정 하나를 내는 데까지 범위를 좁혔습니다.
          </p>
        </Section>

        <Section no="02" title="핵심 결정">
          <Flow steps={['표본 준비', '계획과 예상 비용', '사람 승인', '배치 실행', '채점', '기본값 선정']} />
          <Table
            caption="핵심 결정"
            head={['결정', '내용', '이유']}
            rows={[
              ['선정 규칙을 실행 전에 고정', '품질이 동급인 후보 중 1,000건당 비용이 가장 낮은 조합을 고릅니다. 동급 판정은 짝지은 부트스트랩 10,000회, 95% 구간, 허용폭 3%p(요약은 5%p)입니다', '결과를 본 뒤 기준을 바꾸면 "이긴 조합"이 되고, 미리 정해야 "규칙이 고른 조합"이라고 말할 수 있습니다'],
              ['과금 전에 승인', '예상, 보수, 최악 금액 3종을 보여 주고 승인받습니다. 승인은 계획 해시에 묶어서 계획이 바뀌면 다시 받습니다', '평가 비용이 통제되지 않으면 평가를 못 돌립니다'],
              ['누적 예산 상한', '실행 한 번이 아니라 프로젝트 전체 누적 사용 기록에 $5 상한을 걸고, 다음 배치가 상한을 넘기면 제출 전에 멈춥니다', '실수로 큰 금액이 나가는 일을 막습니다'],
              ['모든 조합에 같은 조건', 'SDK 호출은 어댑터 한 곳에 두고 effort를 항상 명시하며, 다른 모델이 대신 답하는 fallback은 쓰지 않습니다', '조건이 다르면 비교가 공정하지 않습니다'],
              ['90조합을 다 돌리지 않음', 'Haiku는 effort 5단계 × 프롬프트 2버전을 100건씩, Sonnet과 Opus는 이긴 프롬프트 하나로 공통 30건만 돌립니다', '$5 안에 들도록 요청 수를 줄이는 배분입니다'],
            ]}
          />
          <ul>
            <li>프롬프트 v2는 v1을 고치지 않고 더하기만 했습니다. 정의 요약, 판단 기준 3줄, 예시 2개를 더해서 프롬프트 개선의 효과를 모델과 effort의 효과와 같은 표에서 비교할 수 있습니다.</li>
            <li>요약 업무는 정답이 하나가 아니어서 Sonnet 5.5를 채점자로 고정하고 어느 모델의 답인지 숨겼습니다. 사람이 30건을 직접 채점해 채점자가 믿을 만한지도 확인했습니다.</li>
          </ul>
        </Section>

        <Section no="03" title="정책 설계">
          <Table
            caption="정책"
            head={['결정', '내용']}
            rows={[
              ['예산', '전체 상한 $5를 누적 사용 기록으로 관리하고, 비용은 응답의 usage로 다시 계산해 예상치와 나란히 보고합니다'],
              ['승인', '승인 전 과금 호출은 0건이고, 승인된 계획 해시만 제출합니다'],
              ['금액 추정', 'count_tokens로 예상, 보수, 최악 3종 금액을 냅니다. 파일럿으로 출력 토큰을 먼저 재서 이후 계획에 반영합니다'],
              ['선정 규칙', '규칙과 허용폭을 실행 전에 등록하고, 결과를 본 뒤 바꾸지 않습니다'],
              ['채점 신뢰도', '사람 교정 일치율이 80% 미만이면 해당 업무 결과를 참고용으로 표시합니다'],
              ['데이터와 키', '데이터 원본은 저장소에 넣지 않고 라이선스를 기록합니다. API 키는 환경변수 하나만 쓰고 로그, DB, 리포트에 남기지 않습니다'],
            ]}
          />
          <p>
            사용자는 명령 7개로 한 흐름을 진행합니다. prepare(표본 준비), plan(계획과 예상 비용), approve(승인), run(실행, 중단 후 이어서 실행 가능),
            status(누적 사용액), calibrate(사람 교정 채점), report(리포트와 기본값 선정)입니다. 비용이 드는 단계는 모두 plan, approve, run을 거칩니다.
          </p>
        </Section>

        <Section no="04" title="코드 구조 — 돈이 나가는 길은 한 줄로">
          <p>
            CLI 하나와 모듈 스무 개 남짓입니다. 비용이 드는 길(계획, 승인, 실행)과 평가하는 길(채점, 선정, 리포트)을 나눴고,
            Anthropic SDK를 부르는 곳은 어댑터 한 곳, 사용 기록(장부)을 쓰는 곳은 runner 한 곳뿐입니다.
          </p>
          <CodeTree groups={[
            {
              title: '비용을 통제하는 코드',
              note: '승인 없이는 과금 호출 0건',
              rows: [
                ['planner.py', '조합 × 표본 배분, 금액 계산, 계획 해시'],
                ['estimator.py', '예상·보수·최악 3종 금액'],
                ['pricing.py', '모델 단가와 요청 비용 (단가표는 설정 파일)'],
                ['gate.py', '승인 화면과 해시에 묶인 승인'],
                ['runner.py', '배치 분할, 상한 확인, 제출, 장부 기록'],
                ['adapters/', 'Batch·동기 호출, 시험용 가짜 어댑터. SDK는 여기서만'],
              ],
            },
            {
              title: '평가하고 고르는 코드',
              note: '결과를 본 뒤 바꾸지 않음',
              rows: [
                ['tasks/', '업무 정의, 고정 시드 표본 준비'],
                ['graders/', '분류·추출 채점(순수 함수), 요약 블라인드 채점과 사람 교정'],
                ['selection.py', '기본값 선정 규칙'],
                ['report.py', '리포트, 차트, 예상 대 실제 비용 오차'],
                ['store.py', 'SQLite 표 6개'],
                ['cli.py', '명령 7개 입구'],
              ],
            },
          ]} />
          <h3>핵심 코드</h3>
          <p>앞의 결정과 정책이 실제로 들어 있는 곳입니다. 원본에서 줄만 줄였고 동작은 그대로입니다.</p>
          <CodeTabs items={[
            {
              file: 'src/promptbench/selection.py',
              title: '기본값 선정 규칙',
              why: '1등과 차이가 허용폭 안인 조합을 "동급"으로 묶고, 그중 1,000건당 비용이 가장 낮은 것을 고릅니다. 두 조합에 같은 문항을 다시 뽑아 비교하므로 문항 난이도 차이가 섞이지 않습니다.',
              code: selectionCode,
            },
            {
              file: 'src/promptbench/gate.py',
              title: '해시에 묶인 승인',
              why: '승인 기록에 계획 본문의 해시를 남기고, 실행할 때 본문에서 해시를 다시 계산해 비교합니다. 승인 뒤 계획이 바뀌면 실행이 거부됩니다.',
              code: gateCode,
            },
            {
              file: 'src/promptbench/runner.py',
              title: '누적 예산 상한',
              why: '배치를 내기 직전마다 누적 사용액과 다음 배치의 보수적 예상액을 더해 $5 상한과 비교합니다. 제출 도중 끊긴 배치는 다시 내지 않고 멈춰서 이중 과금을 막습니다.',
              code: runnerCode,
            },
          ]} />
        </Section>

        <Section no="05" title="실측 결과">
          <p>
            문의 분류와 정보 추출은 한국어 음성 비서 발화 데이터(MASSIVE ko-KR, 의도 60종과 슬롯 55종)를, 요약은 BBC 코리아 기사 데이터(XL-Sum)를 썼습니다.
            아래는 사전에 등록한 선정 규칙이 고른 업무별 기본값입니다.
          </p>
          <Table
            caption="업무별 기본값"
            head={['업무', '기본값', '품질 (공통 30건)', '1,000건당 비용', '큰 모델과 비교']}
            rows={[
              ['문의 분류', 'Haiku 5.5 · max · v2', '정확도 0.833', '$0.22', 'Opus low는 정확도 0.833으로 같고 비용은 $3.93으로 약 17배'],
              ['정보 추출', 'Opus 5.5 · low · v2', 'F1 0.675', '$3.77', 'Haiku 중 최고는 0.561에 $0.13, Sonnet medium은 0.667에 $1.89'],
              ['요약 (참고용)', 'Haiku 5.5 · high · v2', '통과율 0.767', '$0.30', 'Sonnet medium도 0.767이지만 비용은 $4.73으로 약 16배'],
            ]}
          />
          <Figure
            images={[
              { src: chartT1, alt: '문의 분류의 정확도와 비용 그래프: Haiku max v2가 Opus low v2와 같은 정확도에 훨씬 싼 비용으로 선정됨' },
              { src: chartT2, alt: '정보 추출의 F1과 비용 그래프: Opus low v2가 선정됨' },
            ]}
            caption="문의 분류(왼쪽)와 정보 추출(오른쪽)의 품질 대 비용. 점선은 같은 비용에서 가장 높은 품질을 이은 선이고, 붉은 원이 선정된 기본값입니다."
          />
          <Metrics items={[
            ['2 / 3', '가장 싼 Haiku가 기본값이 된 업무'],
            ['0.530', '정보 추출 F1, 프롬프트 v2 (v1은 0.455)'],
            ['10.2% 이내', '단계별 예상 대비 실제 비용 오차 (파일럿 제외)'],
            ['0건', '승인 없이 나간 과금 호출'],
          ]} />
          <ul>
            <li><strong>큰 모델이 늘 필요하지는 않았습니다.</strong> 문의 분류와 요약은 가장 싼 Haiku가 기본값이 되었고, 정보 추출만 큰 모델이 앞섰습니다.</li>
            <li><strong>프롬프트 개선이 효과가 있었습니다.</strong> Haiku의 effort 5단계 평균으로 보면 v2가 세 업무 모두 v1보다 높았습니다. 요약의 max effort만 예외였습니다.</li>
            <li><strong>effort를 최대로 올리는 것은 항상 이득이 아니었습니다.</strong> Haiku max는 문의 분류에서만 가장 높았고(100건 기준 0.870), 정보 추출에서는 응답 지연이 중앙값 기준 15~27초에 이르고 출력이 잘리는 요청이 나왔으며 비용은 약 7~10배였습니다.</li>
            <li><strong>비용 추정은 맞는 편이었습니다.</strong> 기록된 총비용은 $4.37입니다.</li>
          </ul>
          <h3>측정 조건과 한계</h3>
          <Callout>
            <p>
              기본값은 공통 30건 기준 판정이고, 조합 사이 차이의 대부분이 95% 구간 안에 있어서 확정하려면 표본을 늘려야 합니다.
              요약은 사람 교정 일치율이 63.3%로 기준(80%)에 못 미쳐 참고용으로만 표시했습니다. 채점자가 Sonnet 후보도 채점해 자기 선호 편향이 있을 수 있다는 점도 리포트에 남겼습니다.
            </p>
          </Callout>
          <p>
            사용한 데이터는 음성 비서 발화라 실제 고객 문의와 다르므로, 이 도구의 가치는 수치보다 같은 절차로 자기 정답셋을 다시 돌릴 수 있다는 점에 있습니다.
          </p>
        </Section>

        <Section no="06" title="문서 체계">
          <DocList items={[
            { id: 'D01', title: '기획서', desc: '문제 정의, 대안 비교, MVP 범위와 제외, 성공 지표, 리스크', href: doc('D01.pdf'), type: 'pdf' },
            { id: 'D02', title: '요구사항정의서', desc: '기능과 비기능 요구사항, 수용 기준, 추적 매트릭스', href: doc('D02.xlsx'), type: 'xlsx' },
            { id: 'D03', title: '정책서', desc: '예산, 승인, 선정 규칙, 채점 신뢰도 등 정책마다 규칙과 이유', href: doc('D03.pdf'), type: 'pdf' },
            { id: 'D04', title: '데이터·결과 규격서', desc: '업무 정의, 데이터 클래스, DB 테이블, 요청 ID 규칙, 가격표 형식, 계획 상태 전이', href: doc('D04.xlsx'), type: 'xlsx' },
            { id: 'D05', title: '정보구조·흐름도', desc: '명령 흐름', href: doc('D05.pdf'), type: 'pdf' },
            { id: 'D06', title: 'CLI 화면설계서', desc: '화면별 출력', href: doc('D06.pdf'), type: 'pdf' },
            { id: 'D07', title: '기능명세서', desc: '명령과 모듈별 입력, 출력, 예외', href: doc('D07.xlsx'), type: 'xlsx' },
            { id: 'D08', title: '시스템·AI 설계서', desc: '구성도, 어댑터 경계, 프롬프트 v1과 v2, 채점자 설계, 기술 결정 기록', href: doc('D08.pdf'), type: 'pdf' },
            { id: 'D09', title: '실측 리포트', desc: '업무별 결과표, 품질 대 비용 그림, 예상 대 실제 비용, 채점자 교정', href: doc('D09.pdf'), type: 'pdf' },
            { id: 'D10', title: '요약본', desc: '기획과 실측 전체를 3쪽으로', href: doc('D10.pdf'), type: 'pdf' },
          ]} />
          <p style={{ marginTop: 24 }}>
            AI 작업자 여럿을 조율하는 방식은 <Link to="/convoy">멀티 에이전트 병렬 실행 엔진</Link>에서 다뤘습니다.
          </p>
        </Section>
      </Article>

      <NextProject to="/convoy" label="다음 프로젝트" title="멀티 에이전트 병렬 실행 엔진" desc="개인 프로젝트 · Claude Code 활용" />
    </>
  )
}
