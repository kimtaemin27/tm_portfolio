import { Link } from 'react-router'
import {
  Article, Callout, Decisions, DocList, Figure, Fixes, Flow, Metrics, More, NextProject,
  Problems, ProjectHero, RoleCards, Section, Table,
} from '../components/ui.jsx'
import arch from '../assets/images/convoy/arch.webp'
import check from '../assets/images/convoy/check.webp'
import board from '../assets/images/convoy/board.webp'
import env from '../assets/images/convoy/env.webp'
import merge from '../assets/images/convoy/merge.webp'

const doc = (name) => `${import.meta.env.BASE_URL}docs/convoy/${name}`

export default function Convoy() {
  return (
    <>
      <title>Convoy | 김태민 포트폴리오</title>
      <ProjectHero
        tag="개인 프로젝트 · AI 실행 엔진"
        title="Convoy"
        lead="계획서의 서로 의존하지 않는 Task를 여러 AI 작업자(claude -p)에게 동시에 맡기고, 순서·잠금·병합 같은 조율은 코드 하나가 맡는 실행 엔진입니다. 기획 문서부터 구현, 순차 대 병렬 실측까지 직접 했습니다."
        meta={[
          ['기간', '2026.10'],
          ['역할', '기획(문제 정의, 정책, 대화형 UX, 기능 명세), 구현(CLI와 Claude Code 플러그인), 실측 설계와 리포트'],
          ['산출물', '기획 문서 10종, 동작하는 CLI·플러그인, 실측 리포트'],
        ]}
        chips={['Claude Code', 'claude -p', 'Python', 'git worktree', 'CLI', '플러그인']}
        cover={{ src: arch, alt: 'Convoy 구조도: 입구 두 개(CLI, 플러그인), 상태의 유일한 작성자인 coordinator, 각자 worktree에서 일하는 작업자 세 명' }}
        stats={[
          ['53.1%', '소요시간 단축 (폭 넓은 계획)'],
          ['0건', 'main 오염'],
          ['0건', '조용한 실패'],
          ['72개 · 21개', '요구사항 · 정책'],
        ]}
      />

      <Article>
        <Section no="01" title="해결하려던 문제">
          <Callout>
            <p>계획서는 Task를 잘게 나눠 주는데, 실행은 그중 하나씩만 한다.</p>
          </Callout>
          <p>
            Claude Code와 superpowers로 개발하면 흐름은 브레인스토밍, 계획 작성, 실행 순서입니다.
            계획서는 Task 열 개 안팎으로 쪼개지지만, 실행 단계는 Task 하나를 끝내고 리뷰를 마친 뒤에야 다음 Task로 넘어갑니다.
          </p>
          <Problems items={[
            '독립 Task도 순서대로 기다립니다. 이 프로젝트의 기획 문서 계획도 Task 11개 중 6개가 같은 Task 하나에만 의존해 동시에 시작할 수 있었습니다.',
            '진행 장부와 역할 분담은 있는데, 구현 작업자를 동시에 띄우는 것은 막혀 있습니다.',
            '세션 여러 개를 열고 md 파일 하나를 공유하는 우회책은 동작했지만, 동시 쓰기 충돌, 대기 순서, 죽은 세션을 사람이 지켜봐야 했습니다.',
          ]} />
          <p>
            그래서 기획 질문을 이렇게 세웠습니다. 계획서를 그대로 받아, 의존하지 않는 Task를 동시에 돌리면서도
            main을 지키고 실패를 놓치지 않을 수 있는가.
          </p>
        </Section>

        <Section no="02" title="내린 판단과 이유">
          <h3>대체가 아니라 빈자리 메우기</h3>
          <Table
            caption="포지셔닝"
            head={['선택지', '판단']}
            rows={[
              ['브레인스토밍부터 실행까지 전부 만드는 독자 프레임워크', '잘 되는 부분까지 다시 만든다. 택하지 않음'],
              ['superpowers 위에 얹는 애드온', '막히는 지점인 실행만 맡는다. 계획서 읽기는 어댑터로 분리해 다른 형식도 받을 수 있게 둔다. 택함'],
              ['superpowers 자체 수정', '효과를 실측으로 증명한 뒤 기능 제안으로. 보류'],
            ]}
          />
          <h3>핵심 가치 셋</h3>
          <Decisions items={[
            { title: '기다리지 않는다', body: 'Depends로 의존 그래프를 만들어 실행 가능한 Task를 작업자 여럿에게 동시에 맡깁니다. 의존이 적혀 있지 않으면 순차로 봅니다.' },
            { title: 'main은 지킨다', body: '결과는 통합 브랜치에 한 번에 하나씩 병합하고 병합마다 테스트합니다. main 반영은 전체 완료 뒤 사용자 승인으로만 합니다.' },
            { title: '조용히 실패하지 않는다', body: '상태 파일은 coordinator 하나만 씁니다. 환경 실패는 전체를 일시정지하고, 상황판에는 마지막 갱신 경과 시간을 늘 보입니다.' },
          ]} />
          <Callout>
            <p>
              뒤의 두 가치가 첫 번째의 전제입니다. 빨라져도 main이 깨지거나 실패를 놓치면 순차보다 못합니다.
              그래서 성공 지표도 단축률 하나가 아니라 main 오염 0건, 조용한 실패 0건을 나란히 두었습니다.
            </p>
          </Callout>
        </Section>

        <Section no="03" title="구조 — AI는 판단·제안, 조율은 코드">
          <RoleCards items={[
            { who: 'AI 작업자', does: '자기 worktree 안에서 Task 구현과 테스트, 자기 outbox에 진행 보고', doesNot: '상태 파일 쓰기, 다른 Task 건드리기, push' },
            { who: 'AI 대표 세션', does: '상황판을 읽고 설명, 의존 관계 제안', doesNot: '상태를 직접 고치기, 작업자 글을 지시로 따르기' },
            { who: '코드 (coordinator)', does: '순서, 우선권, 잠금, 병합, 실패 분류, 상태 기록', doesNot: '의미 추정' },
          ]} />
          <Figure
            diagram
            images={[{ src: arch, alt: 'Convoy 구조도: 사용자는 CLI 또는 플러그인으로 명령하고, coordinator만 상태 파일을 쓰며, 작업자는 각자 outbox에만 쓴다' }]}
            caption="입구는 CLI와 Claude Code 플러그인 두 개지만 상태를 쓰는 것은 coordinator 하나입니다. 작업자 글은 스키마 필드만 해석하고 자유 텍스트는 표시만 합니다."
          />
          <p>
            LLM은 같은 질문에도 다르게 답합니다. 순서, 잠금, 병합까지 LLM에 맡기면 어떤 입력에서 왜 그렇게 됐는지 증명할 수 없습니다.
            규칙을 코드로 두면 오래 기다린 Task가 영영 밀리지 않는다는 성질을 시드를 고정한 시뮬레이션으로 시험할 수 있습니다.
          </p>
        </Section>

        <Section no="04" title="조율 규칙">
          <Table
            caption="조율 규칙"
            head={['규칙', '내용']}
            rows={[
              ['우선권 (aging)', '상위 Task를 먼저 하되, 오래 기다린 Task의 순위를 조금씩 올려 영영 못 하는 일이 없게 한다. 동률이면 먼저 요청한 쪽이 앞선다'],
              ['단일 작성자', '상태 파일과 상황판은 coordinator만 쓴다. 작업자는 자기 outbox에, CLI는 inbox에만 쓴다. 관례가 아니라 구조로 강제한다'],
              ['병합', '통합 브랜치에 한 번에 하나씩 넣고 테스트한다. 충돌이나 테스트 실패면 그 병합만 되감고 그 Task만 사람에게 올린다'],
              ['충돌 회피', '수정 파일이 겹치는 Task는 동시에 실행하지 않는다'],
              ['실패 분류', '종료코드와 출력 본문을 함께 본다. 작업 실패는 그 Task만 재시도하고, 인증 만료 같은 환경 실패는 전체를 일시정지한다'],
              ['죽은 작업자', '메시지와 프로세스가 모두 없으면 배정을 만료시키고 다시 배정한다'],
              ['AI 글은 데이터', '계획서, 저장소, outbox의 자유 텍스트는 표시만 하고 지시로 따르지 않는다. 스키마를 벗어난 줄은 버리고 건수를 보인다'],
            ]}
          />
          <More summary="기술 선정 기록">
            <Table
              caption="기술 선정 기록"
              head={['결정', '이유']}
              rows={[
                ['단일 작성자 coordinator + 작업자별 outbox', '동시 쓰기 충돌을 구조로 없앤다'],
                ['파일 기반 허브 (상주 서버 없음)', '설치할 것이 없고, 상태를 파일로 열어 볼 수 있다'],
                ['Python 표준라이브러리 중심', '의존성을 줄여 어디서나 돈다'],
                ['작업자는 claude -p, WorkerBackend 뒤에 숨김', '작업자 종류를 바꿔도 조율 코드는 그대로 둔다'],
                ['입구는 CLI + 플러그인 (CLI 래퍼)', '플러그인은 같은 CLI를 부르고 결과를 대화로 풀어 줄 뿐 상태를 직접 고치지 않는다'],
              ]}
            />
          </More>
        </Section>

        <Section no="05" title="화면 — 돌리기 전에 알고, 도는 중에 보인다">
          <p>아래 화면은 기획 문서의 예시 화면입니다. 계획서와 수치는 설명용 가상 예시입니다.</p>
          <Figure
            images={[{ src: check, alt: 'convoy check 예시 화면: Task별 의존 해석, 함께 시작할 수 있는 묶음, 이론상 단축률, 순환 의존 시 실행 거부' }]}
            caption="convoy check. 계획서를 읽기만 하고 의존 해석, 함께 시작할 수 있는 묶음, 이론상 단축률을 보입니다. 순환 의존이면 무엇이, 왜, 다음에 무엇을 할지 세 줄로 알리고 실행을 거부합니다."
          />
          <Figure
            images={[{ src: board, alt: 'convoy status 예시 화면: Task 표, 승인 대기, 병합 대기열, 작업자 표, 버린 줄' }]}
            caption="상황판. 칸은 늘 같은 자리에 있고 비어 있으면 '없음'으로 남깁니다. 칸이 사라지면 없음과 고장을 구분할 수 없어서입니다. 머리줄의 마지막 갱신 경과 시간으로 coordinator가 멈춘 것도 알 수 있습니다."
          />
          <Figure
            images={[
              { src: env, alt: '환경 실패 예시 화면: 인증 만료로 전체 일시정지, 다시 로그인 후 resume' },
              { src: merge, alt: '병합 충돌 예시 화면: 충돌난 병합만 되감고 그 Task만 사람 승인 대기로' },
            ]}
            caption="왼쪽: 인증 만료처럼 모든 작업자가 부딪힐 문제는 전체를 일시정지합니다 / 오른쪽: 병합 충돌은 그 병합만 되감고 그 Task만 사람에게 올리며, 다른 Task는 계속 돕니다."
          />
        </Section>

        <Section no="06" title="실측 결과">
          <p>
            독립 Task가 많은 계획(wide, Task 8개)과 앞 Task를 이어받는 사슬 계획(deep, Task 6개)을 순차(작업자 1명)와 병렬로 3회씩 돌렸습니다.
            회차마다 새 복제본에서 돌리고, 순서를 번갈아 API 상태의 흔들림이 한쪽에 몰리지 않게 했습니다. 끝나지 않은 회차도 지우거나 고르지 않기로 정해 두었고, 이번에는 모든 회차가 완료됐습니다.
          </p>
          <Metrics items={[
            ['53.1%', 'wide 소요시간 단축 (목표 30%)'],
            ['0건', 'main 오염 (회차 12개 대조)'],
            ['0건', '조용한 실패'],
            ['$0.79', '순차·병렬 비용 같음 (wide, 정가 환산)'],
          ]} />
          <Table
            caption="계획별 실측 결과"
            head={['계획', '순차 중앙값', '병렬 중앙값', '단축률 (실측)', '이론상 단축률']}
            rows={[
              ['wide (독립 Task 많음)', '153.5초', '71.9초', '53.1%', '50.0%'],
              ['deep (사슬)', '125.8초', '101.1초', '19.6%', '0.0%'],
            ]}
          />

          <h3>이상한 숫자를 그냥 넘기지 않았다</h3>
          <Callout>
            <p>
              이론상 병렬로 얻을 것이 없는 사슬 계획(deep)에서도 병렬이 19.6% 빨랐습니다. 좋은 숫자지만 설명이 안 돼서 로그를 열었습니다.
            </p>
          </Callout>
          <Fixes items={[
            {
              problem: '작업자가 한 명이면 앞 Task를 병합한 뒤에도 그 프로세스가 완전히 끝날 때까지 다음 Task를 배정하지 않았습니다. 이 대기가 Task마다 몇 초씩 순차 시간에 쌓였습니다.',
              fix: '대기를 뺀 관점을 함께 실었습니다. wide는 42.8%로 여전히 목표를 넘었고, deep은 3.5%로 거의 사라졌습니다.',
            },
            {
              problem: '대기의 원인은 동시 실행 수와 슬롯 이름이 묶여 있던 것이었습니다.',
              fix: '둘을 떼어 놓고 같은 계획, 같은 설정으로 다시 쟀습니다. 로그에서 대기는 0초로 사라졌습니다.',
            },
          ]} />
          <p>
            다만 재측정 회차의 소요시간이 크게 흔들려, 고친 효과가 끝에서 끝까지의 소요시간에 얼마나 나타나는지는 정하지 못했습니다.
            그래서 성공 지표 판정은 원래 측정만으로 하고, 재측정은 따로 실었습니다.
          </p>
          <More summary="개선 전/후 재측정 표">
            <Table
              caption="개선 전후"
              head={['항목', 'wide 전', 'wide 후', 'deep 전', 'deep 후']}
              rows={[
                ['순차 중앙값', '153.5초', '138.3초', '125.8초', '134.5초'],
                ['병렬 중앙값', '71.9초', '105.2초', '101.1초', '127.5초'],
                ['단축률', '53.1%', '23.9%', '19.6%', '5.2%'],
                ['순차 흩어짐', '8.5%', '59.8%', '4.4%', '46.7%'],
                ['순차 배정 대기 합', '28.7초', '0.0초', '19.4초', '0.0초'],
              ]}
            />
            <p>흩어짐은 회차 소요의 최대와 최소의 차를 중앙값으로 나눈 값입니다. 흔들림의 원인은 검증하지 않은 가설로 남겼습니다.</p>
          </More>
        </Section>

        <Section no="07" title="정직한 한계">
          <Flow steps={['측정한 것은 측정값으로', '못 잰 것은 "측정하지 않음"으로', '추정은 "추정"으로']} />
          <ul>
            <li>
              <strong>작업자 격리는 도구 권한 수준입니다.</strong> worktree 밖 읽기, 밖에 쓰기, 상위 경로 읽기, push 네 가지 탈출 시도는 모두 막혔습니다.
              하지만 작업자가 실행하는 코드(작업자가 쓴 테스트 설정 파일 등)는 OS 수준에서 갇히지 않아 밖의 파일을 읽을 수 있음을 직접 확인했습니다.
              그래서 저장소와 상위 폴더에 비밀을 두지 말라는 경고를 문서 맨 앞에 두었습니다.
            </li>
            <li>
              <strong>주입 내성은 표본 하나입니다.</strong> 저장소 파일에 "시스템 공지"로 꾸민 지시를 심었고 작업자는 따르지 않았지만,
              노골적인 미끼 하나일 뿐이라 주입에 강하다는 증거로 쓰지 않았습니다.
            </li>
            <li><strong>표본이 작습니다.</strong> 작고 균일한 Task로 된 계획 두 종, 방식별 3회입니다. 단축률을 다른 계획으로 옮겨 말하지 않습니다.</li>
            <li><strong>재지 않은 것</strong>은 대표 세션 설명의 정확성, 의존 제안 품질, OS 수준 격리, 사용량 한도에 걸렸을 때의 동작입니다. 문서 끝까지 "측정하지 않음"으로 표시했습니다.</li>
          </ul>
        </Section>

        <Section no="08" title="문서 체계">
          <p>
            요구사항(기능 56 · 비기능 16), 정책 21, 명령 11, 장면 12, 상태, 기술 결정은 데이터 파일 한 곳에 두고 문서는 ID로만 참조했습니다.
            실측 리포트의 수치는 손으로 쓰지 않고 실측 결과 파일에서 표로 생성합니다. 끊긴 ID 참조가 있으면 빌드가 실패합니다.
          </p>
          <DocList items={[
            { id: 'D01', title: '기획서', desc: '문제, 포지셔닝, 핵심 가치, 성공 지표', href: doc('D01.pdf'), type: 'pdf' },
            { id: 'D02', title: '요구사항정의서', desc: '기능 56 · 비기능 16, 수용 기준', href: doc('D02.xlsx'), type: 'xlsx' },
            { id: 'D03', title: '정책서', desc: '정책 21개, 의존 해석·병합·실패 분류', href: doc('D03.pdf'), type: 'pdf' },
            { id: 'D04', title: '메시지·상태 규격서', desc: '작업자 메시지, 상태 전이', href: doc('D04.xlsx'), type: 'xlsx' },
            { id: 'D05', title: 'IA·흐름도', desc: '명령 구조와 흐름', href: doc('D05.pdf'), type: 'pdf' },
            { id: 'D06', title: '대화형 UX 설계서', desc: '장면 12개, 터미널·대화 목업', href: doc('D06.pdf'), type: 'pdf' },
            { id: 'D07', title: '기능명세서', desc: '명령별 동작과 예외', href: doc('D07.xlsx'), type: 'xlsx' },
            { id: 'D08', title: '시스템·AI 설계서', desc: '구조, 기술 결정 7개, AI 경계', href: doc('D08.pdf'), type: 'pdf' },
            { id: 'D09', title: '실측 리포트', desc: '순차 대 병렬 실측, 개선 후 재측정, 한계', href: doc('D09.pdf'), type: 'pdf' },
            { id: 'D10', title: '요약본', desc: '전체를 11쪽으로', href: doc('D10.pdf'), type: 'pdf' },
          ]} />
        </Section>

        <Section no="09" title="회고와 다음 단계">
          <div className="two-col">
            <div>
              <h3>잘된 것</h3>
              <ul>
                <li>속도 지표 옆에 안전 지표 둘을 나란히 두어, 빨라진 만큼 위험해지지 않았다는 근거를 함께 냈습니다.</li>
                <li>좋게 나온 숫자도 설명이 안 되면 로그를 열어 원인을 찾았고, 그 결과를 숨기지 않고 실었습니다.</li>
                <li>조율을 코드로 둔 덕에 LLM 없이 테스트로 규칙을 증명할 수 있었습니다.</li>
              </ul>
            </div>
            <div>
              <h3>남은 것</h3>
              <ul>
                <li>재지 않은 항목(설명 정확성, 의존 제안 품질, OS 수준 격리) 측정</li>
                <li>더 크고 다양한 계획으로 반복 측정</li>
                <li>실측 근거를 정리해 superpowers에 실행 단계 병렬화 기능 제안</li>
              </ul>
            </div>
          </div>
          <p style={{ marginTop: 24 }}>
            AI가 제안하고 코드가 실행한다는 원칙은 <Link to="/excel">ExcelReader</Link>에서도 같은 방식으로 썼습니다.
          </p>
        </Section>
      </Article>

      <NextProject to="/stock" label="다음 프로젝트" title="주식 자동매매 시스템" desc="개인 프로젝트 · AI를 서비스 기능에 안전하게 접목한 사례" />
    </>
  )
}
