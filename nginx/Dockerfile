FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Create directories if they don't exist
RUN mkdir -p /etc/nginx/ssl /usr/share/nginx/html

# Copy SSL certificates
COPY ./ssl/meaw.crt /etc/nginx/ssl/
COPY ./ssl/meaw.key /etc/nginx/ssl/

# Copy nginx configuration
COPY ./conf.d/default.conf /etc/nginx/conf.d/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]