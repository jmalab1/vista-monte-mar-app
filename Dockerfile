FROM nginx    

RUN apt -y update

COPY dist /app/dist
COPY public /app/public

RUN rm -rf /etc/nginx/conf.d/*
COPY conf /etc/nginx/conf.d

COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

ENTRYPOINT [ "/app/run.sh" ]