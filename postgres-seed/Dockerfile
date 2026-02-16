FROM postgres:16-alpine

COPY seed.sql /seed.sql
COPY entrypoint.sh /entrypoint.sh

CMD ["/entrypoint.sh"]
