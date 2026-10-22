# priority.py — 작업자 자리 배정 · 독점 자원 대여 · 병합 순서, 세 곳이 같은 규칙을 쓴다.
# 결정적 코드다(시계·난수·입출력 없음). 현재 시각은 호출자가 넘긴다.

AGING_STEP_S = 30.0  # 초기값 — 실측 후 조정


@dataclass(frozen=True)
class Request:
    task_id: str
    base_rank: int       # Task 번호 순 (T1 = 1). 작을수록 앞선다
    requested_at: float  # 요청 시각(초)


def effective_rank(base_rank: int, waited_s: float, aging_step_s: float = AGING_STEP_S) -> int:
    """유효순위 = 기본순위 − ⌊대기시간 / AGING_STEP⌋ (숫자가 작을수록 앞선다)"""
    if not aging_step_s > 0:
        raise ValueError(f"aging_step_s 는 0 보다 커야 한다: {aging_step_s!r}")
    if math.isinf(aging_step_s):
        return base_rank
    return base_rank - math.floor(max(waited_s, 0.0) / aging_step_s)


def pick_next(requests: Sequence[Request], now: float, aging_step_s: float = AGING_STEP_S) -> Request:
    """유효순위가 가장 작은 요청. 동률이면 먼저 요청한 쪽."""
    if not requests:
        raise ValueError("pick_next: 요청이 없다")
    return min(requests, key=lambda r: (
        effective_rank(r.base_rank, now - r.requested_at, aging_step_s),
        r.requested_at,
        r.base_rank,
    ))
