FROM nginx:bookworm

COPY . /usr/share/nginx/html

COPY conf/default.conf      /etc/nginx/conf.d/
COPY conf/site.conf 		/etc/nginx/conf.d/
COPY conf/certs				/etc/nginx/certs/

# RUN chmod +x /root/tools/*.sh && /root/tools/generate-ssl.sh

EXPOSE 8080
