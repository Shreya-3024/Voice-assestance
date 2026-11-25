# Scalability Strategy

The MVP is local and stores summaries in browser LocalStorage. The following is a proposed strategy for growth; it has not been load-tested for 100,000 users.

## Registered users and concurrent users
Up to 100,000 registered users means that 100,000 accounts could exist in the system. Registered users and concurrent active users are different: only a subset may be speaking or typing at the same time. Capacity should be measured using expected concurrent conversations, requests per minute and peak Gemini calls.

## Proposed production plan
- Deploy the frontend and backend to AWS or another cloud provider using containers.
- Use Docker to package frontend and backend environments.
- Place a load balancer in front of multiple backend instances.
- Scale backend instances horizontally according to CPU, memory and request latency.
- Use Redis for response caching and short-lived session or rate-limit state.
- Use PostgreSQL for persistent user, transcript and summary data.
- Send summarisation jobs to a message queue so long AI requests do not block API servers.
- Use API rate limiting per user and IP, plus authentication and authorisation.
- Manage Gemini quotas and concurrent requests through a queue or gateway.
- Add central monitoring, structured logging, health checks and alerting.
- Split work between normal API servers and dedicated summarisation workers if needed.

Database indexes, connection pools, backups, regional deployment and CDN delivery should be added according to measured traffic. Cost and architecture limits must be reviewed against real usage.
