FROM node:24-alpine
# set working directory
WORKDIR /app
# install netcat for waiting the db
RUN apk add --no-cache netcat-openbsd

# copy package files for better caching
COPY package*.json  /app/

# install all deps (including devDeps)
RUN npm ci
# copy prisma directory
COPY prisma ./prisma
# generate prisma client
RUN npx prisma generate
# set node env to dev
ENV NODE_ENV=production
# RUN npm install nodemon

# RUN npm ci --only=production

# copy the code to the working directory
COPY . .
# build TS -> JS
RUN npm run build

# prunde dev dependencies for prod
# RUN npm prune --production
# expose the app port
EXPOSE 3000
# start the app(compiled JS) for production
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]
# start the app for dev
# CMD ["sh", "-c", "\
#   echo 'Waiting for Postgres...'; \
#   until nc -z db 5432; do sleep 2; done; \
#   npx prisma migrate dev --name=d; \
#   npm run dev \
# "]
