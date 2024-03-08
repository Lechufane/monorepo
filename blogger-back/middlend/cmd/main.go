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

	// When using local development uncomment this line of code with your own port
	port := os.Getenv("PORT")
	// port := "8000"
	fmt.Println("Port: ", port)
	serv, err := server.New(port)
	if err != nil {
		log.Fatal(err)
	}

	serv.Start()
}
