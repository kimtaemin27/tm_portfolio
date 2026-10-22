# gate.py — 승인은 계획 본문에서 다시 계산한 해시에 묶인다.
# 승인 뒤 계획이 한 글자라도 바뀌면 해시가 달라져 승인이 무효가 된다.

def approve(conn, plan_id: str, answer: str) -> bool:
    """answer 가 y 이고 state 가 draft 일 때만 현재 body 의 해시로 승인한다."""
    if answer.strip().lower() != "y":
        return False
    now = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")
    with store.transaction(conn):
        try:
            plan = load_plan(conn, plan_id)
        except ValueError:  # 없는 계획
            return False
        cur = conn.execute(
            "UPDATE plans SET approved_hash=?, approved_at=?, state='approved' "
            "WHERE plan_id=? AND state='draft'", (plan.plan_hash, now, plan_id))
    return cur.rowcount == 1


def is_approved(conn, plan_id: str) -> bool:
    row = conn.execute("SELECT approved_hash FROM plans WHERE plan_id=?", (plan_id,)).fetchone()
    if row is None or not row[0]:
        return False
    return row[0] == load_plan(conn, plan_id).plan_hash
