#!/bin/bash
. venv/bin/activate
cd src
gunicorn --reload --bind 0.0.0.0:8080 main:app
