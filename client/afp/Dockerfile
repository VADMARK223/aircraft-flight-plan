FROM node:23-alpine

RUN npm install --global serve
COPY ./build /build
EXPOSE 3000
ENTRYPOINT ["serve", "-s", "build"]
