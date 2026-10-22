# mask.py — AI 로 보내기 전 개인정보 가리기. 수취인 김** · 연락처 010-****-5678 · 주소 시·구까지.

def pii_kind(col: str, values: List) -> Optional[str]:
    c = col.lower()
    if any(h in c for h in NAME_HEADERS):
        return "name"
    if any(h in c for h in ADDR_HEADERS):
        return "address"
    if any(h in c for h in PHONE_HEADERS):
        return "phone"
    if any(h in c for h in EMAIL_HEADERS):
        return "email"
    # 열 이름이 낯설어도 값으로 알아본다 — 이름 감지가 열 이름에만 기대면 '받으실 분'·'Recipient' 가 그대로 나간다
    filled = [str(v).strip() for v in values if not _blank(v)]
    if not filled:
        return None
    share = lambda pat: sum(1 for v in filled if re.fullmatch(pat, v)) / len(filled)
    if share(r"\+?[\d\s-]{9,}") >= 0.6:
        return "phone"
    if share(r"[^@\s]+@[^@\s]+\.[^@\s]+") >= 0.6:
        return "email"
    # 한글 2~4자이고 거의 다 다른 값이면 사람 이름 — 색상('블랙')처럼 반복되는 값은 아니다
    if len(filled) >= 3 and share(r"[가-힣]{2,4}") >= 0.6 and len(set(filled)) / len(filled) >= 0.6:
        return "name"
    return None


def mask_value(kind: Optional[str], v) -> str:
    if _blank(v) or kind is None:
        return "" if v is None else str(v)
    s = str(v).strip()
    if kind == "name":
        return s[0] + "**"
    if kind == "phone":
        d = re.sub(r"\D", "", s)
        return f"{d[:3] if not d.startswith('82') else '010'}-****-{d[-4:]}" if len(d) >= 8 else "****"
    if kind == "email":
        return "***@" + s.split("@")[-1] if "@" in s else "***"
    if kind == "address":
        s = re.sub(r"^\(?\d{5}\)?\s*", "", s)
        return " ".join(s.split()[:2])
    return s
