FROM python:3.13-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    g++ \
    python3-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# add for db
RUN pip install --no-cache-dir psycopg2-binary

# Install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt



COPY User_manage .
COPY start.sh .

RUN chmod +x /app/start.sh

RUN chown -R root:root /app && \
	chmod -R 755 /app

CMD ["/app/start.sh"]