#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../.." && pwd)"
VENV="$ROOT/.venv-telegram"
LEGACY_VENV="$DIR/.venv"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 не знайдено. На Ubuntu: apt install -y python3 python3-venv"
  exit 1
fi

if ! python3 -m venv --help >/dev/null 2>&1; then
  echo "python3-venv не встановлено. На Ubuntu: apt install -y python3-venv"
  exit 1
fi

if [ -d "$LEGACY_VENV" ] && [ ! -d "$VENV" ]; then
  echo "Знайдено старий venv: $LEGACY_VENV (залишаємо для сумісності)"
fi

if [ ! -d "$VENV" ]; then
  python3 -m venv "$VENV"
fi

"$VENV/bin/pip" install --upgrade pip
"$VENV/bin/pip" install -r "$DIR/requirements.txt"

echo "Готово. Python venv: $VENV"
