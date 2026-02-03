FROM node:24-alpine
# set working directory
WORKDIR /app
# install netcat for waiting the db
RUN apk add --no-cache netcat-openbsd

# copy package files for better caching
COPY package*.json  /app/
# install dependencies
RUN npm ci
# copy prisma schema and generate client

# copy the code to the working directory
COPY . .
# generate prisma client
RUN npx prisma generate
# expose the app port
EXPOSE 3000
# start the app
CMD ["sh", "-c", "\
  echo 'Waiting for Postgres...'; \
  until nc -z db 5432; do echo '.'; sleep 2; done; \
  echo 'Postgres ready'; \
  npx prisma generate; \
  npm run dev -- --host \
"]
# CMD [ "npm", "run", "start" ]