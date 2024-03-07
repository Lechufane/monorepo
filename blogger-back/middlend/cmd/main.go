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
	basePath := os.Getenv("BASE_PATH")
	localBasePath := os.Getenv("LOCAL_BASE_PATH")

	fmt.Println("BASE_PATH:", basePath)
	fmt.Println("LOCAL_BASE_PATH:", localBasePath)

	// When using local development uncomment this line of code with your own port
	port := os.Getenv("PORT")
	// port := "8080"
	serv, err := server.New(port)
	if err != nil {
		log.Fatal(err)
	}

	serv.Start()
}
