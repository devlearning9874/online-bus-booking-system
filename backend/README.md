# Backend Development Database Setup

This backend uses MySQL for local development.

## Start the database

From `backend/`:

```bash
docker compose up -d
```

This brings up:

- `db` on `localhost:3306`
- `adminer` on `http://localhost:8080`

## Configure microservices

Copy the example env file:

```bash
cd backend
copy .env.example .env
```

Then start your microservices with environment variables loaded by your IDE or shell.

### Local service execution

Use these values for host-based execution:

- `SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/onlinebusbooking`
- `SPRING_DATASOURCE_USERNAME=root`
- `SPRING_DATASOURCE_PASSWORD=secret`

### Docker container execution

If you run your microservices in Docker on the same compose network, use this URL instead:

```text
jdbc:mysql://db:3306/onlinebusbooking
```

## Notes

- The MySQL image is configured with `mysql_native_password` for compatibility with Spring Boot.
- `backend/.gitignore` ignores local `target/`, database volume data, and environment files.

## Kafka (development)

This project can run a local Kafka broker for development alongside MySQL. The compose stack includes `zookeeper` and `kafka` services.

Start the full backend stack:

```bash
cd backend
docker compose up -d
```

Verify Kafka is running:

```bash
docker compose ps
docker compose logs -f kafka
```

Create a topic (example `bookings`):

```bash
docker compose exec kafka kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3 --topic bookings
```

List topics:

```bash
docker compose exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --list
```

Spring Boot configuration (example) — add to `application.properties` or environment variables:

```
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.client-id=onlinebus-app
spring.kafka.consumer.group-id=onlinebus-consumer
```

Maven dependency to add to services that produce/consume Kafka messages:

```xml
<dependency>
	<groupId>org.springframework.kafka</groupId>
	<artifactId>spring-kafka</artifactId>
</dependency>
```

Producer and consumer examples are standard Spring Kafka `KafkaTemplate` and `@KafkaListener` usage. Ask me if you want code snippets added to specific microservices.

## Load sample data

Use the provided scripts to load schema and sample data into the running MySQL container. Both scripts use `docker compose exec -T` to attach stdin to the container safely.

PowerShell (Windows):

```powershell
cd backend
./load-sample-data.ps1
```

Bash (Linux/macOS or Git Bash on Windows):

```bash
cd backend
./load-sample-data.sh
```

If you prefer manual commands, run (from `backend`):

```bash
docker compose exec -T db mysql -uroot -psecret < db-schema.sql
docker compose exec -T db mysql -uroot -psecret onlinebusbooking < sample-bus.sql
docker compose exec -T db mysql -uroot -psecret onlinebusbooking < sample-route.sql
# ...repeat for other sample-*.sql files
```
