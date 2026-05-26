# Kafka setup notes

This file documents quick commands and caveats for running Kafka locally for development.

Services in compose:
- `zookeeper` on 2181
- `kafka` on 9092

Common commands

- Start stack:

```bash
cd backend
docker compose up -d
```

- Create topic:

```bash
docker compose exec kafka kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3 --topic bookings
```

- Produce a message (console producer):

```bash
docker compose exec -T kafka kafka-console-producer.sh --bootstrap-server localhost:9092 --topic bookings << 'EOF'
{"id":"1","type":"test","payload":"hello"}
EOF
```

- Consume messages (console consumer):

```bash
docker compose exec kafka kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic bookings --from-beginning --max-messages 10
```

Notes
- The `kafka-topics.sh` and console tools are inside the Kafka container; `docker compose exec` runs them.
- If the container advertises `localhost:9092`, containers inside the same network should instead use `kafka:9092` as the bootstrap server.
- For Spring Boot services running in containers, set `SPRING_KAFKA_BOOTSTRAP_SERVERS=kafka:9092` as env var.
