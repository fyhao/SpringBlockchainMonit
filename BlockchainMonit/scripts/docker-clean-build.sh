docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)
docker image prune -a
docker pull fyhao/springblockchainmonit:latest
docker run -p 8080:8080 fyhao/springblockchainmonit