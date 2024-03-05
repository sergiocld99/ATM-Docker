# Stage 1

## How to build the image
Use the following command: ```docker build --tag imageName:version .```

## How to run it as a container
Use the following command: ```docker run --name containerName -d -p puerto:2000 imageName:version```
You can choose the port number you want, yet it's recommended to use the same (2000)

## How to see the page
Open your browser and go to ```localhost:puerto```. You'll see a Hello World! message.

# Stage 2

## Build and run a composed image
Now we have to use Docker Composer. 

- Create a compose.yaml file where you specify each sub-image configuration. Mongo's image is pulled from Docker Hub, while App's image is created following Dockerfile instructions.
- Use the following command: ```docker-compose up```

You can stop its execution by pressing Ctrl+C.

## See JSON queries
Open the browser and go to ```localhost:puerto/api/...```. Replace "..." with a defined route, for instance "cards/all" or "users/count".

## Undo build operation
Just use the command ```docker-compose down```
