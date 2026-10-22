# ai.py — AI 응답 검증. 하나라도 틀리면 ValueError 로 응답 전체를 버린다.
# 버린 뒤에는 무엇이 틀렸는지 알려 주고 1회만 다시 묻는다. 그래도 실패하면 사람이 직접 고른다.

def parse(text: str, target_columns: List[str]) -> Proposal:
    obj = json.loads(text)
    cmap, conf = {}, {}
    for m in obj["column_map"]:
        tgt = m["target"] or None
        if tgt is not None and tgt not in target_columns:
            raise ValueError(f"표준 열이 아닌 '{tgt}' 에 짝지음")
        cmap[m["source"]] = tgt
        conf[m["source"]] = float(m["confidence"])
    targets = [v for v in cmap.values() if v]
    if len(targets) != len(set(targets)):
        raise ValueError("표준 열 하나에 원본 열 둘 이상")
    rules = []
    for i, r in enumerate(obj["rules"], 1):
        if r["op"] not in OPS:
            raise ValueError(f"목록 밖 동작 '{r['op']}'")
        try:
            params = json.loads(r["params_json"])
            if r["op"] == "parse_date" and isinstance(params, dict):
                params.pop("prefer", None)   # 애매한 날짜의 답은 사람만 정한다 — AI 가 미리 넣은 답은 버린다
            rules.append(Rule(id=f"r{i}", op=r["op"], params=params, rationale=r["rationale"]))
        except Exception as e:  # 매개변수 검증 실패 · JSON 오류
            raise ValueError(f"규칙 {i} ({r['op']}) 매개변수 오류: {str(e)[:200]}")
    cands = [Candidate(c["source"], c["code"], float(c["confidence"])) for c in obj["product_candidates"]]
    return Proposal(cmap, conf, rules, cands)
