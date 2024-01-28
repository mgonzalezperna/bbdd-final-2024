#  DB 2024 assignament.

Flask backend to expose endpoints that interact with a database.
SQL database provides data.
Angular 18 frontend.
----------------------

### To be considered.

This program requires

  * docker and docker-compose

----------------------

### How to run it.

From repo root > 
```
docker compose build
docker compose up
```

After that, open a terminal and execute:

```
❯ docker exec -it mysql /bin/bash
bash-4.4# mysql -uroot -p BBDD < init_data/schema.sql
Enter password: admin
bash-4.4# mysql -uroot -p BBDD < init_data/mocked_data.sql
Enter password: admin
bash-4.4# exit
```

Once the DB is populated, the Frontend should be available using any web browser and navigating to `http://localhost:4200/`.