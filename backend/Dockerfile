# Backend Dockerfile
FROM python:3.13-slim

WORKDIR /app

# Install system dependencies (build-essential for ephem if compiling)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code and data
COPY app/ ./app/
COPY ../data/ ./data/

# Run database ingest if SQLite does not exist yet
RUN python data/ingest/ingest_all.py

ENV PYTHONPATH=/app
ENV PORT=8000

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
