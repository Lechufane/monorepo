package constants

import "os"

var (
	LOGIN_BASE_PATH = os.Getenv("LOGIN_BASE_PATH")
	BASE_PATH       = os.Getenv("BASE_PATH")
	LOCAL_BASE_PATH = os.Getenv("LOCAL_BASE_PATH")
)

const (

	//mod-apis
	BLOG_API_URL   = "/api/blogger-blogs"
	AUTHOR_API_URL = "/api/blogger-auhtors"

	BLOG_LOCAL_API_URL   = ":8081/api/blogger-blogs"
	AUTHOR_LOCAL_API_URL = ":8082/api/blogger-auhtors"

	DATE_FORMAT = "2006-01-02"
)
