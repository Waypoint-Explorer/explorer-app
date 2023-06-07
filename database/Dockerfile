FROM mongo:4

COPY init/init.js /docker-entrypoint-initdb.d/
COPY init/data /docker-entrypoint-initdb.d/data
COPY init/schemas /docker-entrypoint-initdb.d/schemas
COPY init/utils /docker-entrypoint-initdb.d/utils