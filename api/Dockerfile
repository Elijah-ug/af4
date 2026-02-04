FROM node:24-alpine
# set working directory
WORKDIR /app
# install netcat for waiting the db
RUN apk add --no-cache netcat-openbsd

# copy package files for better caching
COPY package*.json  /app/
# install dependencies
# set node env to dev
ENV NODE_ENV=development
RUN npm install
RUN npm install nodemon
# copy prisma directory
COPY prisma ./prisma
# generate prisma client
RUN npx prisma generate
# copy the code to the working directory
COPY . .
# build TS -> JS
# RUN npm run build
# expose the app port
EXPOSE 3000
# start the app
CMD ["sh", "-c", "\
  echo 'Waiting for Postgres...'; \
  until nc -z db 5432; do sleep 2; done; \
  npx prisma migrate dev --name=d; \
  npm run dev \
"]
# CMD [ "npm", "run", "start" ]