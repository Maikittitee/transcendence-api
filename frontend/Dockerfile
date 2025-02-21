FROM nginx:bookworm

COPY . /usr/share/nginx/html

COPY conf/default.conf      /etc/nginx/conf.d/
COPY conf/site.conf 		/etc/nginx/conf.d/
# COPY conf/certs				/etc/nginx/certs/

COPY tools					/tools

RUN chmod +x /tools/*.sh && /tools/generate-ssl.sh
