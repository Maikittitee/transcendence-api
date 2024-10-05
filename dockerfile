FROM ubuntu:22.04

WORKDIR /usr/src/app

RUN mkdir User_manage

COPY ./User_manage ./User_manage

COPY ./requirements.txt ./

COPY ./.env ./

<<<<<<< HEAD
RUN apt-get update && apt-get install -y --no-install-recommends python3.10 python3-pip curl vim
=======
RUN apt-get update && apt-get install -y --no-install-recommends python3.10 python3-pip curl libpq-dev
>>>>>>> b55fc0cf2d79d77a980a0006465f08e9435cc70b
	
RUN pip install -r requirements.txt

EXPOSE 9000

CMD ["python3", "User_manage/manage.py", "runserver", "0.0.0.0:9000", "--noreload"]