#!/bin/bash
. venv/bin/activate
cd src
uvicorn --host 0.0.0.0 --port 8080 main:app
