# scripts/judge_daemon.py — 데몬은 환경변수 파일에서 필요한 키 두 개만 골라 읽는다.
# 파일을 통째로 환경에 부으면, 자식 프로세스인 판정 CLI 가 DB 비밀번호와 증권 API 키를
# 환경변수로 손에 쥔다. 여기에 비밀값을 추가하지 말 것.
ENV_KEYS = ("CLAUDE_CLI_PATH", "JUDGE_BACKEND")


def load_env_selected(path: pathlib.Path, keys: tuple = ENV_KEYS) -> None:
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        k = k.strip()
        if k in keys and not os.environ.get(k):
            os.environ[k] = v.strip().strip('"').strip("'")


# judge_backend.py — 자식 환경도 직접 만든다. subprocess.run 은 env 를 안 주면
# 부모 환경 전체를 물려준다. 최소 집합은 실측으로 정했다: PATH·HOME 만 주면
# 로그인이 풀리고, USER·SHELL·LOGNAME 을 더하면 구독 인증이 살아난다.
_ENV_PASS = ("PATH", "HOME", "USER", "SHELL", "LOGNAME", "LANG", "TMPDIR")

def _child_env(self) -> dict:
    env = {k: v for k, v in os.environ.items() if k in self._ENV_PASS}
    for k, v in os.environ.items():
        if k.startswith("CLAUDE_") or k == "ANTHROPIC_API_KEY":   # CLI 자신이 쓰는 인증 값만
            env[k] = v
    return env
