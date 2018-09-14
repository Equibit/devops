FROM nginx:latest

RUN mkdir -p /etc/nginx/ssl/

#copy private key in ssl dir before running this command
ADD ssl/ /etc/nginx/ssl/

RUN chmod -R 0600 /etc/nginx/

COPY default.conf /etc/nginx/conf.d/default.conf
