#!/bin/bash
cd /home/kavia/workspace/code-generation/employee-performance-and-management-system-163463-162815/employee_system_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

