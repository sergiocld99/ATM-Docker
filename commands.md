# Docker main commands

## IMAGES
- 📃 images
- ⏬ pull [image]

## CONTAINERS
- 🔨 build [--tag nombre:version] .

- ▶️ run [--name nombre] [-d] [-p extPort:intPort] [image]: creates container, -d for running in background. If the image isn't downloaded, the command automatically pulls it. If the name is not specified, it's randomly generated.

- 📃 ps [-a]: shows running containers, -a for all created
- 📃 logs [id or name]
- ⏯️ start [id or name]
- ⏹️ stop [id or name]
- 🚮 rm [id or name]

## DOCKERFILE
- ⏬ FROM image:version
- ➡️ COPY [host file or folder] [container folder]
- 📂 WORKDIR [container folder]
- 💻 RUN [terminal command]: like npm install
- ▶️ CMD ["node", "filename.js"]: only one at the end
