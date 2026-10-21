import { Link } from 'react-router'
import {
  Article, Callout, Decisions, Figure, Fixes, Flow, More, NextProject, Problems,
  ProjectHero, RoleSplit, Section, Table,
} from '../components/ui.jsx'
import arch from '../assets/images/arch.svg'
import pcMl from '../assets/images/pc_ml.webp'
import pcIntel from '../assets/images/pc_intel.webp'
import figJudge from '../assets/images/fig_judge.webp'
import figReportTg from '../assets/images/fig_report_tg.webp'
import figReportHtml from '../assets/images/fig_report_html.webp'
import figOps from '../assets/images/fig_ops.webp'

export default function Stock() {
  return (
    <>
      <title>주식 자동매매 시스템 | 김태민 포트폴리오</title>
      <ProjectHero
        tag="개인 프로젝트"
        title="주식 자동매매 시스템"
        lead="토스증권 Open API 기반의 주식 매매 자동화 시스템입니다. 공시·뉴스 판정과 보유 종목 리포트에 AI를 접목하면서, 외부 텍스트를 다루는 AI가 주문 환경에 닿지 않도록 구조를 나눴습니다."
        meta={[
          ['기간', '2026.06 ~ 진행 중'],
          ['인원', '1인 (기획, 설계, 개발, 운영)'],
          ['AI 활용', '개발 전 과정 Claude Code, 서비스 기능에 Claude CLI'],
        ]}
        chips={['Python', 'FastAPI', 'MySQL', 'Docker', 'Claude Code', 'Claude CLI', 'LightGBM']}
        cover={{ src: pcIntel, alt: 'PC 대시보드 종목 인텔 화면: 뉴스와 공시마다 AI 판정 결과가 붙어 있다' }}
        stats={[
          ['1,059개', '커밋'],
          ['약 7.7만 줄', '코드'],
          ['1,353건', '테스트'],
          ['174개', 'REST API'],
        ]}
      />

      <Article>
        <Section no="01" title="해결하려던 문제">
          <Callout>
            <p>
              공시와 뉴스를 AI로 판정하고 보유 종목 리포트를 AI가 쓰게 하려면, 외부에서 들어오는 텍스트를 AI에 그대로 넘겨야 합니다.
              이 텍스트는 통제할 수 없어서 문장 안에 지시가 숨어 있을 수 있고, 같은 시스템 안에는 실제 주문을 내는 코드가 있습니다.
              AI의 판단을 서비스에 쓰면서도 그 판단이 주문 환경에 닿지 않게 하는 것이 설계 과제였습니다.
            </p>
          </Callout>
          <h3>기능에서 풀어야 했던 문제</h3>
          <Problems items={[
            '같은 사건을 매체마다 다른 제목으로 보도해서 문자열 비교로는 기사를 묶을 수 없었습니다.',
            '보유 종목만 판정하는 구조라 필요한 공시가 빠졌습니다. 해당 사례 9건 중 2건만 판정되어 있었습니다.',
            '당일 자료만으로는 종목이 오르내린 원인을 설명하기에 부족했습니다.',
          ]} />
        </Section>

        <Section no="02" title="내린 판단과 이유">
          <Decisions items={[
            { title: 'AI 실행 위치를 서버 밖으로 분리', body: '판정·리포트용 AI를 서버 컨테이너 밖 별도 실행기에서 돌리고, 서버와는 API로만 통신하게 했습니다. 뉴스와 공시 속에 숨은 지시가 주문 환경에 닿지 않게 하기 위해서입니다.' },
            { title: 'AI 실행기의 권한 최소화', body: 'AI 실행기는 DB 접속 정보와 주문 코드를 모르고, 필요한 키 2개만 전달받습니다.' },
            { title: 'AI 결과는 표시에만 사용', body: 'AI는 판단과 서술만 맡고, 수집·저장·검증·발송·주문은 코드가 담당합니다. AI 결과는 알림과 리포트에만 쓰고 자동 주문에는 연결하지 않았습니다.' },
            { title: '웹 검색을 쓰지 않음', body: '리포트 입력에 보유 정보가 들어가므로 AI가 웹을 검색하면 외부로 새어 나갈 경로가 생깁니다. 자료 수집은 코드가 하고 AI에는 텍스트만 넘겼습니다.' },
            { title: '같은 사건 묶기는 AI, 검증은 서버', body: '제목이 매체마다 달라 AI가 기사를 묶고, 서버가 그 결과를 다시 검증하게 했습니다.', alt: '문자열 비교. 제목 앞 12자 일치율이 0~3%에 그쳤고, 토큰 비교는 ‘5000억’과 ‘5천억’을 다른 값으로 인식했습니다.' },
            { title: '리포트 자료를 기간별로 나눠 전달', body: '당일 자료만으로는 원인 설명이 부족해 최근 90일 자료를 14일·45일·90일 구간으로 나눠 전달했습니다.', alt: '최신순으로만 뽑기. 오래됐지만 중요한 자료가 빠집니다.' },
            { title: '판정 범위를 전 종목 공시로 재설계', body: '전 종목 공시 보관분과 판정 대기열의 차이를 찾아 소급 판정하도록 바꿨고, 늦게 판정된 건이 뒤늦게 알림으로 가지 않도록 3일 기준을 두었습니다.' },
          ]} />
        </Section>

        <Section no="03" title="구현 내용">
          <h3>시스템 구조</h3>
          <Figure
            diagram
            images={[{ src: arch, alt: '시스템 구조도: 서버(Docker) 안의 API, DB, 스케줄러, 주문 엔진과 서버 밖 호스트 실행기의 AI 영역이 API로만 연결된다' }]}
            caption="AI 영역은 서버 밖 호스트 실행기에 있고, DB와 주문 코드에는 접근하지 않습니다."
          />
          <p>
            국내 전 종목 DART 공시(원본 보관), 미국 SEC EDGAR 공시(8-K·10-Q·10-K), 종목별 뉴스, 실시간·분봉·일봉 시세(일봉은 과거 3년치)를
            스케줄러로 수집합니다. 외부 API 점검이나 장애가 생기면 텔레그램으로 알립니다.
          </p>

          <h3>공시·뉴스 호재/악재 판정</h3>
          <Flow steps={['공시·뉴스 수집', '판정 대기열', '판정 데몬', 'Claude CLI', '결과 재검증', '알림·리포트']} />
          <p>판정 결과로 호재/악재 구분, 분류, 확신도, 판정 사유를 남깁니다.</p>

          <h3>보유 종목 리포트 자동 생성</h3>
          <Flow steps={['서버 자료 조립', '리포트 데몬', 'Claude CLI 서술', '서버 HTML 생성', '요약 + 첨부 발송']} />
          <ul>
            <li>데이터가 들어오는 시각에 맞춰 하루 2회 발송합니다. 자료가 덜 모인 시점에는 비교 통계를 뺍니다.</li>
            <li>표본이 부족한 통계를 쓰지 않고, 지속 요인과 당일 요인을 구분하고, 긍정·부정 요인을 함께 쓰고, 매수·매도를 권하지 않는다는 서술 기준을 AI에 제시합니다.</li>
            <li>AI 응답이 실패해도 수치 정보는 발송합니다.</li>
          </ul>

          <h3>AI를 활용한 개발 방식</h3>
          <Flow steps={['브레인스토밍', '설계 문서', '작업 분할', '개발·테스트 병행', '에이전트 리뷰', '문서 정리']} />
          <ul>
            <li>superpowers의 brainstorming으로 기능의 목적, 제약, 대안을 정리한 뒤 설계 문서로 남겼습니다.</li>
            <li>Claude 설정 파일에 작업 단위 규칙을 정의해 기능을 작은 단위로 나눴고, 1번 작업이 끝나면 1번 테스트와 2번 작업을 동시에 진행했습니다.</li>
            <li>설계, 계획 수립, 개발, 테스트가 자동으로 이어지고 단계별 결과 문서도 자동으로 정리되게 했습니다.</li>
            <li>관점별 리뷰 에이전트가 지적한 사항을 다른 에이전트가 교차 검증해, 남은 항목만 반영했습니다.</li>
            <li>문제 정의, 설계 결정, 결과 검증 기준은 직접 맡았고, AI 산출물은 테스트와 측정으로 확인한 뒤 반영했습니다.</li>
          </ul>

          <More summary="기술 상세">
            <Table
              caption="구성 요소"
              head={['구성', '기술', '역할']}
              rows={[
                ['API 서버', 'FastAPI, REST 174개', '대시보드 제공, AI 실행기 연동 API'],
                ['스케줄러', 'APScheduler, 작업 76개', '수집, 판정 대기열 적재, 감시'],
                ['DB', 'MySQL 8, 테이블 65개', '공시·뉴스 원본, 판정 결과, 리포트 자료'],
                ['AI 실행기', 'macOS launchd 데몬 2종', 'Claude CLI 호출, 서버 API만 사용'],
                ['알림', 'Telegram Bot API', '알림 발송, 명령 수신'],
              ]}
            />
            <p>
              사용 기술: Python 3.11, FastAPI, SQLAlchemy 2, MySQL 8, Docker Compose, APScheduler, launchd, Claude Code, Claude CLI, LightGBM, Telegram Bot API
            </p>

            <h3>공시·뉴스 판정 파이프라인</h3>
            <ul>
              <li>DART는 전 종목 공시 원본을 보관하고, SEC EDGAR는 8-K·10-Q·10-K만 수집합니다.</li>
              <li>판정 데몬은 launchd로 5분마다 실행되어, 서버 API에서 대기 건을 조회하고 Claude CLI로 판정한 뒤 결과를 등록합니다.</li>
              <li>소급 판정은 공시 보관분과 판정 대기열의 차집합을 적재하는 방식이라 외부 API를 다시 호출하지 않습니다.</li>
              <li>알림은 3일 이내 건만 발송합니다. 적용 전에 기존 악재 70건으로 확인해 차단되는 건이 0건임을 확인했습니다.</li>
            </ul>

            <h3>리포트 생성 파이프라인</h3>
            <Flow steps={['launchd 15:45·20:10', '자료 조회 API', 'Claude CLI 서술', '발송 API', 'HTML 조립', 'Telegram 발송']} />
            <ul>
              <li>서버가 자료를 조립하고(<code>GET holdings-report</code>), 데몬은 서술만 생성해 다시 넘깁니다(<code>POST holdings-report/send</code>).</li>
              <li>프롬프트 규칙: 표본 비율 80% 미만 통계 사용 금지, 지속 요인과 당일 요인 구분, 다른 종목 기사 제외, 공시 시각 오차 고려, 매수·매도 권유 금지.</li>
              <li>구간 안에서는 종목명이 제목에 있는 기사를 먼저 고릅니다.</li>
              <li>공시 원문 API 본문에서 CSS를 걷어 내 2,000자 한도를 확보했습니다.</li>
            </ul>

            <h3>LLM 격리와 보안</h3>
            <ul>
              <li>외부 텍스트를 다루는 LLM을 컨테이너 밖 호스트 데몬으로 분리했고, 데몬은 서버 API 2개만 호출합니다.</li>
              <li>하위 프로세스가 환경을 물려받지 않도록, 환경변수 파일 전체 대신 필요한 키 2개만 골라 전달합니다.</li>
            </ul>

            <h3>개발 방식</h3>
            <ul>
              <li>주문 경로와 파괴적 변경은 테스트로 동작을 고정한 뒤에만 수정합니다. 주문 호출 지점 수를 AST로 검사하는 테스트를 운영합니다.</li>
              <li>적용 예로 공시·뉴스 판정기를 개발하면서 커밋 25개, 테스트 312건을 남겼습니다.</li>
            </ul>
          </More>
        </Section>

        <Section no="04" title="AI가 맡은 일과 코드가 맡은 일">
          <RoleSplit rows={[
            { name: '공시·뉴스 판정', ai: '호재/악재 분류, 같은 사건 묶기', code: '수집, 결과 재검증, 알림 발송' },
            { name: '보유 종목 리포트', ai: '수집된 자료로 서술 작성', code: '자료 조립, 서술 기준 제시, 발송' },
            { name: '예측 모델', ai: '확률 산출 (LightGBM)', code: '화면 표시, 정기 재학습' },
          ]} />
        </Section>

        <Section no="05" title="결과">
          <p>판정 결과는 PC 대시보드의 종목별 화면과 텔레그램 알림으로 확인합니다.</p>
          <Figure
            narrow
            images={[{ src: figJudge, alt: '텔레그램 악재 감지 알림: 공시 제목, 점수, 확신도, 판정 사유' }]}
            caption="텔레그램 악재 알림. 점수, 확신도, 사유를 보내고 매매에는 반영하지 않는다고 함께 적습니다."
          />
          <p>보유 종목 리포트는 텔레그램 요약 메시지와 첨부 HTML로 하루 2회 발송됩니다.</p>
          <Figure
            images={[
              { src: figReportTg, alt: '텔레그램 보유 종목 리포트 요약 메시지 (종목명은 가림)' },
              { src: figReportHtml, alt: '첨부 HTML 보유 종목 리포트의 요약과 시장 영역 (종목명은 가림)' },
            ]}
            caption="왼쪽: 텔레그램 요약 메시지 / 오른쪽: 첨부 HTML 리포트. 종목명과 가격은 가렸습니다."
          />
          <Figure
            images={[{ src: pcMl, alt: 'PC 대시보드 예측 모델 화면: 종목별 LightGBM 도달확률 예측 결과' }]}
            caption="PC 대시보드 예측 모델 화면. LightGBM 도달확률 예측 결과이며, 실거래와 분리된 검증용 기록입니다."
          />
        </Section>

        <Section no="06" title="실패와 수정">
          <Fixes items={[
            { problem: '도구를 막는다고 설명된 옵션(--allowedTools "")을 켠 상태에서 검증용 파일을 읽게 하자, 파일을 그대로 읽어 반환했습니다.', fix: '실제로 차단되는 옵션(--disallowedTools)으로 교체했습니다.' },
            { problem: '외부 CLI가 인증 만료를 응답 본문에만 담고 종료 코드도 바뀌어, 판정이 3일간 멈췄습니다.', fix: '종료 코드와 상관없이 응답 본문을 먼저 확인하도록 고쳤습니다.' },
            { problem: 'AI 응답의 JSON이 닫히지 않는 문제가 3회 중 2회 발생했습니다.', fix: '닫히지 않은 구조를 복구하는 처리를 추가했습니다.' },
            { problem: '종목 뉴스에 다른 종목 기사가 섞여, 첫 판정의 악재 11건 중 6건이 여기에 해당했습니다.', fix: '서술 기준에 다른 종목 기사를 걸러 내는 규칙을 넣었습니다.' },
            { problem: '텔레그램 메시지가 4,096자를 넘으면 오류 없이 사라졌습니다.', fix: '메시지 길이 제한 처리를 추가했습니다.' },
            { problem: 'AI 단계가 오류 없이 조용히 멈출 수 있었습니다.', fix: '판정 적체와 리포트 미발송을 감시해 알림을 보냅니다.' },
          ]} />
          <Figure
            narrow
            images={[{ src: figOps, alt: '텔레그램 운영 알림: 외부 API 점검 감지와 ML 재학습 시작·완료 (주문 ID는 가림)' }]}
            caption="운영 알림 예시. 외부 API 점검 감지, ML 재학습 시작·완료 알림입니다. 주문 ID는 가렸습니다."
          />
        </Section>

        <Section no="07" title="회고">
          <Callout>
            <p>
              보안 옵션을 직접 시험해 본 뒤로, 차단이나 격리를 한다고 설명된 설정은 문서를 그대로 믿지 않고 직접 시험한 다음에 채택한다는 원칙을 세웠습니다.
              AI는 판단과 서술만 맡기고 수집·검증·발송·주문은 코드가 맡는 역할 분리는 <Link to="/excel">ExcelReader</Link>에서도 같은 원칙으로 썼습니다.
            </p>
          </Callout>
        </Section>
      </Article>

      <NextProject to="/automation" label="다음 프로젝트" title="업무 자동화 사례" desc="회사 업무에서 진행한 자동화 4건" />
    </>
  )
}
