package main

import (
	"fmt"
	"log"
	"mod-middlend/internal/server"
	"os"
)

// @title crv-middlend
// @version 1.0.0
// @BasePath /api

func main() {

	// port := "8000" // This is for local testing. Comment this line of code when deploying.
	port := os.Getenv("PORT")
	fmt.Println("Server running on port: ", port)
	serv, err := server.New(port)
	if err != nil {
		log.Fatal(err)
	}

	serv.Start()
}
