up:
	docker-compose up -d --build
start:
	docker-compose up -d
stop:
	docker-compose stop
logs-server:
	docker-compose logs -f --tail="50" server
logs-client:
	docker-compose logs -f --tail="50" client
restart:
	docker-compose restart mongo
	docker-compose restart server
	docker-compose restart client
getDockerSize:
	du -hc --max-depth=0 /var/lib/docker
down:
	docker-compose stop
	docker-compose down -v --remove-orphans
prune:
	docker system prune
pruneAll:
	docker system prune --all
	docker system prune --volumes