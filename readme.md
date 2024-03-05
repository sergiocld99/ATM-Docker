# How to build the image
Use the following command: ```docker build --tag nombreImagen:1.0 .```

# How to run it as a container
Use the following command: ```docker run --name nombreContenedor -d -p puerto:2000 nombreImagen:1.0```
You can choose the number port you want, yet it's recommended to use the same (2000)