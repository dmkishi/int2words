#!/usr/bin/env bash
#
# Install:
# 1. `cd` to `.githooks`.
# 2. ln -sf ../../.githooks/pre-push.sh ../.git/hooks/pre-push

set -e

GIT_TAG=$(git describe --tags --exact-match 2>/dev/null || echo '')
if [[ -z "$GIT_TAG" ]]; then
  echo "ERROR: Git Tag must be set." >&2
  exit 1
fi
