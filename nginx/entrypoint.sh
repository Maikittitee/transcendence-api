#!/bin/sh

if [ ! -f /etc/nginx/ssl/pong.ktunchar.dev.crt ] || [ ! -f /etc/nginx/ssl/pong.ktunchar.dev.key ]; then
	echo "Generating SSL certificates for pong.ktunchar.dev..."
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout /etc/nginx/ssl/pong.ktunchar.dev.key \
		-out /etc/nginx/ssl/pong.ktunchar.dev.crt \
		-subj "/C=TH/ST=Bangkok/L=Bangkok/O=YourCompany/CN=pong.ktunchar.dev"
fi

# Start nginx
exec nginx -g "daemon off;"