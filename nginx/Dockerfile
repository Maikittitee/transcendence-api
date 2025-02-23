FROM nginx:alpine

# Install OpenSSL
RUN apk add --no-cache openssl

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Create directories
RUN mkdir -p /etc/nginx/ssl /usr/share/nginx/html

# Create entrypoint script to generate certificates
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy nginx configuration
COPY ./conf.d/default.conf /etc/nginx/conf.d/

EXPOSE 80 443

# Use the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]