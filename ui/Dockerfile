FROM node:20
# set working directory
WORKDIR /app
# copy package files for better caching
COPY package*.json ./
# install dependencies
RUN npm ci
# copy code to the working directory
COPY . .
# run build
RUN npm run build
# expose the app port
EXPOSE 80
# start the application
CMD [ "npm", "run", "dev", "--", "--host" ]