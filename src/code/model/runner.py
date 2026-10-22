# runner.py — 배치마다 "누적 사용액 + 다음 배치의 보수적 예상액"이 상한을 넘는지 제출 전에 본다.
# 장부(ledger)를 쓰는 모듈은 여기뿐이다.

def can_submit(cumulative_usd: float, next_conservative_usd: float, cap_usd: float = 5.0) -> bool:
    return cumulative_usd + next_conservative_usd <= cap_usd + EPS


    # run_plan 안, 배치 제출 반복
    for b in split_batches(pending, cons, max_requests=max_requests):
        need = sum(cons[r.request_id] for r in b)
        spent = store.cumulative_usd(conn)
        if not can_submit(spent, need, cap_usd):
            return _halt(conn, plan_id, submitted,
                         f"상한: 누적 ${spent:.4f} + 다음 배치 보수 ${need:.4f} > ${cap_usd:.4f}")
        # submit 직전에 submitting 으로 기록한다. 제출 도중 끊기면 행이 submitting 으로 남고,
        # 재개할 때 다시 내지 않고 멈춰 사람 확인을 요구한다(이중 과금 · 장부 누락 방지).
        with store.transaction(conn):
            conn.executemany("UPDATE requests SET submit_state='submitting' WHERE request_id=?",
                             [(r.request_id,) for r in b])
        try:
            job = adapter.submit(list(b))
        except Exception:
            _set_state(conn, plan_id, "halted")
            raise
