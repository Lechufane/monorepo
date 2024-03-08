package databaseHelpers

import (
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

var (
	Db            *gorm.DB
	parseTimeFlag = "?parseTime=true"
	connectionUrl = os.Getenv("DB") + "/blogger_blog" + parseTimeFlag
)

func InitDB() *gorm.DB {
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
