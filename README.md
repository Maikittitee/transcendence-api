# HOW TO RUN 

## frontend 

```
cd frontend
node server.js
```
the http server will run on port 8000


## backend 
### setup: load example data
```
python3 manage.py loaddata stored_data/db.json
```
### run
```
cd backend
source env/bin/activate
pip3 install -r requirements.txt
make
```
backend server will run on port 9000
