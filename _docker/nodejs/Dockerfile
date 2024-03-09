FROM node:18

# Install dependencies
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    curl

USER node

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY . .

RUN chown node: /home/node/app
RUN chmod 775 /home/node/app

# https://github.com/vitejs/vite/discussions/3396
# CMD ["sh", "-c", "npm install && npm run dev -- --host 0.0.0.0"]