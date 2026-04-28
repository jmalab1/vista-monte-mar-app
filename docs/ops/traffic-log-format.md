# Traffic Log Format

Nginx writes page-request traffic logs to:
- `/var/log/nginx/visitor_traffic.log`

Format fields (JSON per line):
- `time`: ISO-8601 request time
- `remote_addr`: client IP
- `method`: HTTP method
- `uri`: request URI after location rewrite
- `status`: HTTP response status code
- `referer`: request referer header
- `user_agent`: request user-agent header
- `request_time`: request duration in seconds

Scope:
- Logging is enabled only for `location /vista_monte_mar/`.
- `/api/*` proxy traffic is intentionally excluded.
