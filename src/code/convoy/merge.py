# gitops.py — 통합 브랜치에 Task 하나를 병합하고 테스트한다.
# 충돌이나 테스트 실패면 그 병합만 병합 전 커밋으로 되감고, 결과를 돌려준다.

def _merge(integ, pre_sha, task_id, branch, test_command, classify) -> MergeResult:
    r = subprocess.run(
        ["git", "-C", str(integ), "merge", "--no-ff", "-m", f"convoy: merge {task_id} ({branch})", branch],
        capture_output=True, text=True)
    if r.returncode != 0:
        files = git(integ, "diff", "--name-only", "--diff-filter=U", check=False)
        git(integ, "merge", "--abort", check=False)
        if _ok(integ, "rev-parse", "-q", "--verify", "MERGE_HEAD"):
            raise UnsafeCheckout(f"merge --abort 후에도 MERGE_HEAD 가 남아 있습니다: {integ}")
        if not files:
            raise GitError(f"git merge {branch} 실패: {r.stderr.strip() or r.stdout.strip()}")
        _reset_clean(integ, pre_sha)
        return MergeResult("conflict", pre_sha, None, False, files)
    if test_command is None:
        return MergeResult("merged", pre_sha, head_sha(integ), False, "")
    code, output = _run_test(test_command, integ)
    if code == 0:
        return MergeResult("merged", pre_sha, head_sha(integ), True, "")
    _reset_clean(integ, pre_sha)
    status = "env_failed" if classify(code, output) == "env" else "test_failed"
    return MergeResult(status, pre_sha, None, True, _tail(output))
