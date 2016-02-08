FROM nginx:1.9.5
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /usr/share/nginx/html/50x.html

COPY deploy/oligoeditor.com.conf /etc/nginx/conf.d/
COPY index.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
