FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

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
CMD ["ls"]

RUN python /app/User_manage/manage.py makemigrations

RUN python /app/User_manage/manage.py migrate

EXPOSE 9000

CMD ["python", "User_manage/manage.py",  "runserver", "0.0.0.0:9000", "--noreload"]
