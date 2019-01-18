#!/usr/bin/env bash

# Compatibility Checker

BINARY=$1

# GNU Binary
GBINARY="g${BINARY}"

# Return GNU Binary if it exists, otherwise return normal
if hash $GBINARY 2>/dev/null; then
    COMPAT=$GBINARY
else
    COMPAT=$BINARY
fi

echo $COMPAT