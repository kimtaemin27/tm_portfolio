# judge_backend.py — 종료코드와 응답 본문을 둘 다 본다.
def judge(self, prompt: str) -> str:
    cmd = [self.cli_path, "-p", prompt, *CLI_ARGS_NO_TOOLS]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True,
                           timeout=self.timeout, cwd=self._scratch_dir,
                           env=self._child_env(), stdin=subprocess.DEVNULL)
    except subprocess.TimeoutExpired as e:
        raise RuntimeError(f"CLI 타임아웃({self.timeout}s)") from e
    if r.returncode != 0:
        # 실사고: 판정이 3일 멈췄는데 로그는 "CLI 종료코드 1: " 한 줄뿐이었다.
        # stderr 는 비어 있었고 진짜 원인(로그인 만료)은 stdout 본문에 있었다.
        # 그래서 실패 원인을 stdout 본문 → stderr 순으로 찾아 남긴다.
        raise RuntimeError(f"CLI 종료코드 {r.returncode}: {_failure_detail(r)}")
    # 반대로 로그인 만료를 종료코드 0 으로 주는 버전도 있었다. 여기서 안 끊으면
    # 그 문자열이 판정 응답인 척 흘러가 "JSON 배열을 찾지 못함"이 되고,
    # 설정 문제가 판정 실패로 둔갑해 5분마다 CLI 호출만 태우게 된다.
    try:
        body = json.loads(r.stdout)
    except (ValueError, RecursionError, MemoryError):
        return r.stdout
    if isinstance(body, dict) and body.get("is_error"):
        detail = str(body.get("result") or body.get("api_error_status") or "")[:200]
        raise RuntimeError(f"CLI 오류 응답(is_error): {detail}")
    return r.stdout
