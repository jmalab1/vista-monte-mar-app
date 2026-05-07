#!/bin/bash
set -eu

: "${API_UPSTREAM:=http://127.0.0.1:8135}"

envsubst '${API_UPSTREAM}' < /app/server.conf.template > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
