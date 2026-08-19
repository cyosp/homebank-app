FROM alpine:3.23.5

LABEL maintainer=cyosp@cyosp.com

RUN apk upgrade \
    && apk add \
        nginx \
        bash

RUN mkdir -p /run/nginx /var/www/html /var/lib/homebank/data
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

RUN rm /etc/nginx/http.d/default.conf
COPY docker/nginx.conf /etc/nginx/http.d/homebank.conf

COPY dist/homebank /var/www/html

EXPOSE 80

COPY docker/entrypoint.sh  /
RUN chmod a+x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
