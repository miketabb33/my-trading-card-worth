FROM mongo:4.4.6

COPY init.json /init.json
CMD mongoimport --authenticationDatabase=admin --uri mongodb://admin:admin@mongo:27017/test --collection expansions --type json --file /init.json --jsonArray