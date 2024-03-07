FROM golang:1.20-alpine3.19

RUN mkdir /app

ADD . /app

WORKDIR /app

RUN go build -o cmd main

CMD ["/app/main"]


