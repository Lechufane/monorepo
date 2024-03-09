package databaseHelpers

import (
	"fmt"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

var (
	Db            *gorm.DB
	parseTimeFlag = "?parseTime=true"
	// connectionUrl = "root:root@(localhost:3306)" + "/blogger_author" + parseTimeFlag // TODO: This is for local testing. Comment this line of code when deploying
	connectionUrl = os.Getenv("DB") + "/blogger_author" + parseTimeFlag
)

func InitDB() *gorm.DB {
	fmt.Println("DB URL: ", connectionUrl)
	var mysqlTimeFormat = "2006-01-02 15:04:05"
	//fmt.Println("INIT CALL")
	var err error
	// Parse local time
	localTime := "2006-01-02 15:04:05"
	var loc = time.FixedZone("", -3*60*60)
	timeDateNow := time.Now().In(loc).Format(mysqlTimeFormat)
	parsedTime, err := time.Parse(localTime, timeDateNow)
	if err != nil {
		panic(err.Error())
	}

	// Create GORM configuration
	config := gorm.Config{
		NowFunc: func() time.Time {
			return parsedTime
		},
		TranslateError: false,
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	}

	db, err := gorm.Open(mysql.Open(connectionUrl), &config)
	db.Debug()
	if err != nil {
		fmt.Println("Error connecting to database", err)
		panic(err.Error())
	}
	sqlDB, err := db.DB()
	if err != nil {
		panic(err.Error())
	}
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)
	return db
}
