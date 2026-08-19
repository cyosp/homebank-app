#!/bin/bash

echo "$WEBDAV_AUTH_BASIC_CONFIG" > /etc/nginx/.webdav.passwords

exec nginx -g 'daemon off;'
