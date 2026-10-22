# event_judge.py — 응답 검증. 네트워크를 부르지 않아서 Claude 없이 전 경로를 테스트한다.
# 스키마에 안 맞는 건은 버린다. 프롬프트는 확률이고, 여기는 결정이다.

def parse_response(raw: str, sent_ids: list[int]) -> tuple[dict[int, dict], str | None]:
    text = _clean(raw)
    start, end = text.find("["), text.rfind("]")
    if start < 0 or end < 0:
        return {}, "JSON 배열을 찾지 못함"
    try:
        arr = json.loads(text[start:end + 1])
    except (ValueError, RecursionError, MemoryError) as e:
        return {}, f"JSON 파싱 실패: {e}"[:200]
    if not isinstance(arr, list):
        return {}, "최상위가 배열이 아님"

    allowed = set(int(i) for i in sent_ids)
    out: dict[int, dict] = {}
    for o in arr:
        ...
        if oid not in allowed:
            logger.warning(f"[판정] 보내지 않은 id {oid} — 버림")
            continue
        label = str(o.get("label") or "").upper()
        if label not in VALID_LABELS:
            logger.warning(f"[판정] id {oid} 라벨 이상({label}) — 버림")
            continue
        raw_score, raw_conf = o.get("score"), o.get("confidence")
        if isinstance(raw_score, bool) or isinstance(raw_conf, bool):
            # bool 은 int 의 하위 클래스라 float() 가 조용히 1.0/0.0 으로 통과시킨다
            logger.warning(f"[판정] id {oid} 수치가 불리언 — 버림")
            continue
        ...
        if not (-2.0 <= score <= 2.0) or not (0.0 <= conf <= 1.0):
            logger.warning(f"[판정] id {oid} 범위 밖(score={score} conf={conf}) — 버림")
            continue
        # 시황(지수·수급·다른 회사 기사)은 이 종목 고유 정보가 아니다.
        # 모델이 그래도 호재/악재를 붙여 오면 중립으로 내린다. score 는 분석용으로 남긴다.
        if cat == "시황" and label != "NEUTRAL":
            label = "NEUTRAL"
        ...
    _flatten_same_as(out)   # "같은 사건" 연결을 한 단계로 접고 순환을 끊는다
    return out, None
