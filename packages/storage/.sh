 find . -type f \
  -not -path './.git/*' \
  -not -path './node_modules/*' \
  -not -path './dist/*' \
  -not -name 'contexto.txt' \
  -not -name 'package-lock.json' \
  -not -name 'pnpm-lock.yaml' \
  -not -name 'yarn.lock' \
  -print0 |
while IFS= read -r -d '' f; do
  if file --mime-encoding "$f" | grep -qv 'charset=binary'; then
    printf '\n\n===== %s =====\n\n' "$f"
    cat "$f"
  fi
done > contexto.txt
