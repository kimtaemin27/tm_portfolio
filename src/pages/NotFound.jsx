import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="wrap">
      <title>페이지를 찾을 수 없습니다 | 김태민 포트폴리오</title>
      <section className="page-head">
        <h1>페이지를 찾을 수 없습니다</h1>
        <p className="lead">주소가 바뀌었거나 없는 페이지입니다.</p>
        <p><Link to="/">처음으로 돌아가기</Link></p>
      </section>
    </div>
  )
}
