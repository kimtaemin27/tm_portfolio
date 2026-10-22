# classify.py — 실패 판정. 종료코드와 출력 본문을 함께 본다.
# "실측"은 실제 출력으로 확인한 것, "추정"은 재현하지 못한 것.
ENV_SIGNALS = [
    r"not logged in",                                   # 실측
    r"please run /login",                               # 실측
    r"invalid api key|authentication_error",            # 추정(미재현)
    r"rate.?limit|usage limit|credit balance is too low",  # 추정(미재현)
    r"overloaded",                                      # 추정(미재현)
    r"no space left on device|enospc",                  # 추정(미재현)
]
ENV_SIGNALS = [re.compile(p, re.IGNORECASE) for p in ENV_SIGNALS]

# 실측: 인증 없음 → null, 잘못된 모델 → 404 (환경 실패 아님).
# 아래 값은 모두 추정(미재현): 401 인증, 429 한도, 529 과부하.
ENV_API_ERROR_STATUS = {401, 429, 529}


def classify_failure(exit_code: int | None, output: str) -> FailureKind:
    """실패로 확정된 경우에만 부른다. 'env' 또는 'work' (모르면 work)."""
    res, others = _scan(output)
    if res is None:
        text = output
    else:
        if not res.get("is_error"):
            return "work"
        status = res.get("api_error_status")  # 데이터다 — 정수가 아니면 보지 않는다
        if isinstance(status, int) and not isinstance(status, bool) and status in ENV_API_ERROR_STATUS:
            return "env"
        body = res.get("result")
        text = (body if isinstance(body, str) else "") + "\n" + "\n".join(others)
    return "env" if any(p.search(text) for p in ENV_SIGNALS) else "work"
