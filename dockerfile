FROM ubuntu:22.04

WORKDIR /usr/src/app

RUN mkdir User_manage

COPY ./User_manage ./User_manage

COPY ./requirements.txt ./

COPY ./.env ./

RUN apt-get update && apt-get install -y --no-install-recommends python3.10 python3-pip curl vim
	
RUN pip install -r requirements.txt

EXPOSE 9000

CMD ["python3", "User_manage/manage.py", "runserver", "0.0.0.0:9000", "--noreload"]