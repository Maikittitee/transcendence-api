FROM    debian:bullseye
RUN     apt update && apt upgrade -y && apt install nginx -y
RUN     apt install openssl -y

COPY    /nginx.conf /etc/nginx/conf.d/

RUN     mkdir -p /etc/nginx/ssl
RUN     openssl req -x509 -nodes -out /etc/nginx/ssl/nginx.crt -keyout /etc/nginx/ssl/nginx.key -subj "/C=FR/ST=IDF/L=Thailand/O=42/OU=42/CN=lsomrat.42.fr/UID=login"



RUN     rm /etc/nginx/sites-enabled/default && rm /etc/nginx/sites-available/default


# COPY
CMD	[ "nginx", "-g", "daemon off;" ]
