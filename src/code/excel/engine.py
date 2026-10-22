# engine.py — 승인된 규칙을 적용한 뒤 불변식 네 가지를 검사한다.
# 하나라도 깨지면 결과를 내보내지 않고, 규칙을 하나씩 늘려 가며 처음 깨지는 규칙을 찾는다.

def _checks(orig, final, changes, lineage, amount_col) -> List[Check]:
    checks = [Check("행 수", len(final) == len(orig), f"{len(orig)} → {len(final)}")]
    src = lineage.get(amount_col) if amount_col else None
    if amount_col and final.has(amount_col) and src:
        parsed = [O.strict_int(v) for v in orig.column(src)]
        expect = sum(p for p in parsed if p is not None)
        # 결과 쪽도 같은 엄격한 해석으로 읽는다 — 아직 글자인 금액('12,900원')도 같은 금액으로 본다
        got = sum(n for n in (O.strict_int(v) for v in final.column(amount_col)) if n is not None)
        failed = sum(1 for v, p in zip(orig.column(src), parsed) if p is None and not O._blank(v))
        none_read = failed > 0 and not any(p is not None for p in parsed)
        if none_read:   # 하나도 못 읽었으면 0 = 0 이 '통과'처럼 보인다 — 실패로
            checks.append(Check("금액 합", False, f"금액을 하나도 숫자로 읽지 못함 · {failed}칸"))
        else:
            checks.append(Check("금액 합", expect == got, f"{expect:,} → {got:,}"))
    else:
        checks.append(Check("금액 합", True, "금액 열 없음"))
    checks.append(Check("원본 불변", True, "원본은 새 결과와 분리"))
    logged, real = _collapse(changes), _overall_diff(orig, final, lineage)
    checks.append(Check("변경 기록", logged == real, f"차이 {len(real):,} / 기록 {len(logged):,}"))
    return checks


def apply_rules(t: Table, rules: List[Rule], amount_col: Optional[str] = "결제금액") -> ApplyResult:
    snapshot = t
    final, changes, reviews, lineage, skipped = _run(t, rules)
    checks = _checks(t, final, changes, lineage, amount_col)
    if t != snapshot:
        checks = [c if c.name != "원본 불변" else Check("원본 불변", False, "원본이 바뀜") for c in checks]
    if all(c.ok for c in checks):
        return ApplyResult(final, changes, reviews, checks, True, skipped=skipped)
    cause = None
    for k in range(1, len(rules) + 1):   # 규칙을 하나씩 늘려 가며 처음 깨지는 규칙을 찾는다
        f2, ch2, _, lin2, _ = _run(t, rules[:k])
        if not all(c.ok for c in _checks(t, f2, ch2, lin2, amount_col)):
            cause = rules[k - 1].id
            break
    return ApplyResult(None, [], reviews, checks, False, cause, skipped)
