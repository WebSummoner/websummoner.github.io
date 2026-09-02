FROM ghcr.io/gohugoio/hugo:v0.165.0 AS build
COPY --chown=hugo:hugo site /project/site
RUN hugo --source /project/site --destination /project/dist --cleanDestinationDir

FROM nginx:stable-alpine
COPY --from=build /project/dist /usr/share/nginx/html
