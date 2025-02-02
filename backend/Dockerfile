FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED        1
ARG SECRET_KEY
ARG UID
ARG FT_CLIENT_SECRET
ARG REDIRECT_URI
ARG OAUTH_URL

ENV SECRET_KEY=$SECRET_KEY
ENV UID=$UID
ENV FT_CLIENT_SECRET=$FT_CLIENT_SECRET
ENV REDIRECT_URI=$REDIRECT_URI
ENV OAUTH_URL=$OAUTH_URL



# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app/

# Run migrations and collect static files
RUN python /app/User_manage/manage.py makemigrations
RUN python /app/User_manage/manage.py migrate

EXPOSE 9000


CMD ["python", "User_manage/manage.py",  "runserver", "0.0.0.0:9000", "--noreload"]

# CMD tail -f /dev/null
