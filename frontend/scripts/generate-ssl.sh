#!bin/bash
# https://www.baeldung.com/openssl-self-signed-cert

DOMAIN_NAME="foobar.com"

openssl req \
    -x509 \
    -nodes \
    -days 365 \
    -newkey rsa:2048 \
    -keyout ./certs/nginx.key \
    -out ./certs/nginx.crt \
    -subj "/C=TH/ST=Bangkok/L=Bangkok/O=42Bangkok/OU=Crocodile/CN=$DOMAIN_NAME"
