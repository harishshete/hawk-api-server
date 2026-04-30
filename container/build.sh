

#!/bin/sh

sudo docker buildx build --platform linux/amd64 --load -f container/Dockerfile . -t "immnan/hawk-apiserver:0.1.0"
sudo docker tag "immnan/hawk-apiserver:0.1.1" "immnan/hawk-apiserver:latest"

# Pushing this to my repo for now. 
sudo docker push "immnan/hawk-apiserver:0.1.1"
sudo docker images

