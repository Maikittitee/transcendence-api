FROM ubuntu:22.04

WORKDIR /usr/src/app

RUN mkdir User_manage

COPY ./User_manage ./User_manage

COPY ./requirements.txt ./

COPY ./.env ./

RUN apt-get update && apt-get install -y --no-install-recommends python3.10 python3-pip
	
RUN pip install -r requirements.txt

CMD ["tail", "-f", "/dev/null"]
