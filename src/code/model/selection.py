# selection.py — 기본값 선정 규칙: 1등과의 차이가 δ 이내인 조합 중 가장 싼 것.
# 차이는 "같은 문항"을 양쪽에 다시 뽑는 짝지은 부트스트랩으로 잰다.

def paired_bootstrap_upper(best, other, metric, n_boot=10_000, seed=0, alpha=0.05) -> float:
    """metric(best*) - metric(other*)의 1 - alpha/2 분위수. 같은 인덱스 표본을 양쪽에 쓴다."""
    n = len(best)
    if n != len(other) or n == 0:
        raise ValueError("best and other must be non-empty and equally long")
    rng = random.Random(seed)
    diffs = []
    for _ in range(n_boot):
        idx = [rng.randrange(n) for _ in range(n)]
        diffs.append(metric([best[i] for i in idx]) - metric([other[i] for i in idx]))
    diffs.sort()
    k = math.ceil((1 - alpha / 2) * n_boot) - 1
    return diffs[k]


def choose_default(cands, metric, delta, n_boot=10_000, seed=0) -> Selection:
    best = min(cands, key=lambda c: (-metric(c.outcomes), c.combo_id))
    bounds = {}
    for c in cands:
        bounds[c.combo_id] = 0.0 if c is best else paired_bootstrap_upper(
            best.outcomes, c.outcomes, metric, n_boot=n_boot, seed=seed)
    equiv = [c for c in cands if bounds[c.combo_id] <= delta + EPS]
    chosen = min(equiv, key=lambda c: (
        c.cost_per_1k,                                                   # 1순위: 1,000건당 비용
        math.inf if c.latency_p50_ms is None else c.latency_p50_ms,      # 2순위: 지연 중앙값
        c.effort_rank,                                                   # 3순위: 낮은 effort
        c.combo_id,
    ))
    return Selection(best=best.combo_id, chosen=chosen.combo_id,
                     equivalent=tuple(c.combo_id for c in equiv), upper_bounds=bounds)
