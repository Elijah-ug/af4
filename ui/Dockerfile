FROM node:24-alpine
# set working directory
WORKDIR /app
# copy package files for better caching
COPY package*.json /app/
# install dependencies
RUN npm ci
# copy src to for better caching
COPY src ./src
# copy code to the working directory
COPY . .
# run build
RUN npm run build
# expose the app port
EXPOSE 80
# start the application
CMD [ "npm", "run", "dev", "--", "--host" ]