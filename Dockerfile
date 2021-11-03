# Stage 1
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs14:14.17.6 AS builder

USER root

WORKDIR /app

COPY . .

RUN npm run build

USER node

# Stage 2
FROM registry.il2.dso.mil/platform-one/devops/pipeline-templates/base-image/harden-nginx-20:1.20.1

USER appuser

COPY --from=builder --chown=appuser:appuser /app/build /var/www

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]

