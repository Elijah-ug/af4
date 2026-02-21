FROM node:20
# set working directory
WORKDIR /app
# install netcat for waiting the db
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# copy package files for better caching
COPY package*.json  ./

# install all deps (including devDeps)
RUN npm ci
# copy prisma directory
COPY prisma ./prisma
# generate prisma client
RUN npm install -D nodemon

RUN npx prisma generate
# ENV NODE_ENV=production

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
CMD ["sh", "./entrypoint.sh"]

