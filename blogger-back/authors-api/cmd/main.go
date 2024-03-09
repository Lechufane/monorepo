package main

import (
	"blogger-author-api/internal/server"
	"fmt"
	"log"
	"os"
)

// @title Template
// @version 1.0.0
// @BasePath /api

func main() {
	// When using local development uncomment this line of code with your own port

	// port := "8002" // TODO:This is for local testing. Comment this line of code when deploying.
	port := os.Getenv("PORT")
	fmt.Println("Server running on port: ", port)

	serv, err := server.New(port)
	if err != nil {
		log.Fatal(err)
	}

	serv.Start()
}
