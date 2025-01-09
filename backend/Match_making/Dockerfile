FROM python:3.12-slim

WORKDIR /app

COPY . .
RUN export HOST_IP=$(hostname -I | awk '{print $1}')
RUN echo $HOST_IP
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 25566

CMD ["python3", "./Match_making/manage.py", "runserver", "0.0.0.0:25566"]