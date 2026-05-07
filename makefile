APP_NAME := hawk-apiserver
VERSION := 0.1.3
REGISTRY := immnan
IMAGE := $(REGISTRY)/$(APP_NAME)
DOCKERFILE := container/Dockerfile
NODE_PLATFORMS := linux/amd64,linux/arm64

.PHONY: help install build-image push-image release clean

help:
	@echo "Available targets:"
	@echo "  make install       - Install Node.js dependencies"
	@echo "  make build-image   - Build container image and tag $(IMAGE):$(VERSION), $(IMAGE):latest"
	@echo "  make push-image    - Push both image tags to Docker registry"
	@echo "  make release       - Build image and push both tags"
	@echo "  make clean         - Remove node_modules and lock files"

build-image:
	sudo docker buildx build \
		--platform $(GOOS)/$(GOARCH) \
		--load \
		-f $(DOCKERFILE) 

install:
	npm install

build-image:
	sudo docker buildx build \
		--platform $(NODE_PLATFORMS) \
		--load \
		-f $(DOCKERFILE) \
		-t $(IMAGE):$(VERSION) \
		-t $(IMAGE):latest \
		.
	sudo docker images

push-image:
	sudo docker push $(IMAGE):$(VERSION)
	sudo docker push $(IMAGE):latest

release: build-image push-image

clean:
	rm -rf node_modules package-lock.json