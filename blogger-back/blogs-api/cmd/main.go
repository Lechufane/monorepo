package main

import (
	"blogger-blog-api/internal/server"
	"log"
	"os"
)

// @title Template
// @version 1.0.0
// @BasePath /api

func main() {
	// When using local development uncomment this line of code with your own port
	// port := "8001"
	port := os.Getenv("PORT")

	serv, err := server.New(port)
	if err != nil {
		log.Fatal(err)
	}

	serv.Start()
}
