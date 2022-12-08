FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
RUN python -m pip install requests
WORKDIR /app

# Copy the top-level files in your service's directory
# Modify these instructions to do that
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY token_auth.py token_auth.py
COPY authenticator.py authenticator.py

# Copy all of the subdirectories in your service's directory
# Modify these instructions to do that
COPY queries queries
COPY routers routers
COPY migrations migrations

RUN pip install -r requirements.txt
CMD python migrate && uvicorn main:app --reload --host 0.0.0.0 --port $PORT
