# backends/claude.py — 작업자는 자기 worktree 를 cwd 로, 허용 도구를 좁혀 띄운다.
WORKER_FLAGS = [
    "--permission-mode", "acceptEdits",
    "--allowedTools",
    "Bash(git add:*)",
    "Bash(git commit:*)",
    "Bash(python3 -m pytest:*)",
    "Bash(convoy-emit:*)",    # 자기 outbox 에 스키마 맞는 한 줄을 붙이는 도우미
]


class ClaudeBackend:
    def argv_for(self, spec: WorkerSpec) -> list[str]:
        return [self.claude_bin, "-p", build_prompt(spec), "--output-format", "json", *WORKER_FLAGS]

    def start(self, spec: WorkerSpec) -> WorkerHandle:
        p = subprocess.Popen(
            self.argv_for(spec), cwd=spec.worktree, stdin=subprocess.DEVNULL,
            stdout=spec.log, stderr=spec.log, env=self.env_for(spec), start_new_session=True,
        )
        self._procs[p.pid] = p
        return WorkerHandle(p.pid, spec.task.id, spec.worker, spec.attempt, Path(spec.log.name))


# gitops.py — 허용 목록에 없는 프로토콜 이름만 남겨 모든 전송을 막는다.
# 원격 주소가 무엇으로 설정돼 있든 push 할 수 없다.
def push_block_env(repo: Path) -> dict[str, str]:
    return {"GIT_ALLOW_PROTOCOL": "convoy-none"}
