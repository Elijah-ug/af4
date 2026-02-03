FROM node:24-alpine
# set working directory
WORKDIR /app
# copy package files for better caching
COPY package*.json /app/
# install dependencies
RUN npm ci
# copy code to the working directory
COPY . .
# run build
RUN npm run build
# expose the app port
EXPOSE 5173
# start the application
CMD [ "npm", "run", "dev", "--", "--host" ]