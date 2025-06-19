#!/bin/bash
cd /home/kavia/workspace/code-generation/harmonyflow-62318-2cb881a2/harmonyflow_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

