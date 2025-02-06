FROM python:alpine
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r 'requirements.txt'
COPY . .
EXPOSE 3017
CMD ["uvicorn", "main:app", "--reload", "--PORT=3017"]