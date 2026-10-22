# recipe.py — 같은 양식의 다음 파일은 저장된 레시피로 AI 없이 정리한다.
# 양식은 열 이름으로 알아보고, 레시피 사전에 없는 값이 나오면 사람에게 다시 묻는다.

def fingerprint(columns: List[str]) -> str:
    """정규화한 열 이름을 순서대로 이은 값의 해시 — 이름·개수·순서가 하나라도 바뀌면 달라진다."""
    norm = [re.sub(r"\s+", " ", c).strip().lower() for c in columns]
    return hashlib.sha1("\x1f".join(norm).encode("utf-8")).hexdigest()[:12]


def unseen_values(t: Table, recipe: Recipe) -> Dict[str, List[str]]:
    """레시피의 값 사전(map_values · map_product)에 없는 값 — 열마다 처음 나온 순서로."""
    out: Dict[str, List[str]] = {}
    for k, r in enumerate(recipe.rules):
        if r.op not in ("map_values", "map_product"):
            continue
        col = r.params["column"]
        cur = _run(t, recipe.rules[:k])[0]   # 그 규칙 직전의 표 — 원본 열 이름으로 온 새 파일도 맞게 본다
        if not cur.has(col):
            continue
        known = set(r.params["mapping"]) | {str(v) for v in r.params["mapping"].values()}
        new = []
        for v in cur.column(col):
            s = str(v).strip()
            if not _blank(v) and s not in known and s not in new:
                new.append(s)
        if new:
            out[col] = new
    return out
