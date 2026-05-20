package main

import (
	"log"
	"wan-api-kol-event/Controllers"
	"wan-api-kol-event/Initializers"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func init() {
	Initializers.LoadEnvironmentVariables()
	Initializers.ConnectToDB()
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	// Define your Gin routes here
	r.GET("/kols", Controllers.GetKolsController)

	// Run Gin server
	if err := r.Run(":8081"); err != nil {
		log.Println("Failed to start server")
	}
}
