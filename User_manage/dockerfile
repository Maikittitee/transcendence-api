FROM ubuntu:22.04

WORKDIR /usr/src/app

RUN mkdir User_manage

COPY ./User_manage ./User_manage

COPY ./requirements.txt ./

COPY ./.env ./
COPY ./wait-for-postgres.sh ./

COPY ./start.sh ./

RUN apt-get update && apt-get install -y --no-install-recommends python3.10 python3-pip curl
	
RUN pip install -r requirements.txt

RUN chmod +x ./start.sh

EXPOSE 9000

CMD ["./start.sh"]
