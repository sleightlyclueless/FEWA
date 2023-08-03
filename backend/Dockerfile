FROM node:18-alpine

# Define working directory - used as base path in other commands
WORKDIR /app

# Register package.json for Docker
COPY ["package.json", "package-lock.json", "./"]

# Install node modules from package.json
RUN npm install
COPY . .

# TODO: Data copy not initializing and npm run exiting...
#CMD ["npm", "run", "start"]
#CMD [ "cp", "-r", "node_modules", "/data" ]