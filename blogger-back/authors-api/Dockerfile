FROM golang:alpine AS build

# GOPROXY resolves dependencies treefrom cache or repository
ENV GOPROXY=https://proxy.golang.org
ENV PORT=8082

WORKDIR /go/src/api
COPY . .
# Set OS as linux
RUN GOOS=linux go build -o /go/bin/api cmd/main.go

EXPOSE 8082

FROM alpine
COPY --from=build /go/bin/api /go/bin/api
ENTRYPOINT ["go/bin/api"]

#Run migrations with the following command
CMD ["api", "migrateup"]