# judge_backend.py — 판정 CLI 는 도구를 하나도 쓰지 못하게 띄운다.
# 뉴스 제목은 통제할 수 없는 외부 텍스트라, 그대로 두면 뉴스 한 줄이
# 실주문이 나가는 환경에서 명령을 실행시킬 수 있다. 분류에는 도구가 필요 없다.
#
# 실측으로 원래 가정이 뒤집혔다: --allowedTools "" 는 도구를 막지 않는다.
# 빈 폴더에 미끼 파일을 두고 읽으라고 시켰더니 그대로 읽었다.
# 실제로 막은 것은 --disallowedTools 였다. 그래서 세 겹으로 간다.
#  (1) --disallowedTools   실측으로 거부가 확인된 수단
#  (2) --restricted        목록을 빠져나가는 도구가 생겨도 작업 폴더(빈 임시 폴더) 안에 가둔다
#  (3) --strict-mcp-config 호스트에 붙은 MCP 서버를 끌고 오지 않는다
# 튜플로 고정한다 — 훗날 .append() 한 줄로 방어가 조용히 약해지지 않게.
CLI_ARGS_NO_TOOLS = (
    "--output-format", "json",
    "--restricted",
    "--strict-mcp-config",
    "--allowedTools", "",
    "--disallowedTools",
    "Read,Write,Edit,Bash,Glob,Grep,WebFetch,WebSearch,Task,Agent,NotebookEdit",
)


class ClaudeCliBackend:
    def __init__(self, cli_path: str | None = None, timeout: int = 120):
        self.cli_path = cli_path or os.getenv("CLAUDE_CLI_PATH", "claude")
        self.timeout = timeout
        # cwd 를 주지 않으면 CLI 는 저장소 루트를 물려받고, 거기엔 비밀값 파일이
        # 파일 읽기 한 번 거리에 있다. 빈 임시 폴더로 돌려 애초에 읽을 게 없게 만든다.
        self._scratch_dir = tempfile.mkdtemp(prefix="judge_cli_")
