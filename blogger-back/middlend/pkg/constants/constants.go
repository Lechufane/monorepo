package constants

import "os"

var (
	BLOGS_API  = os.Getenv("BLOGS_API")
	AUTHOR_API = os.Getenv("AUTHORS_API")
)

const (
	LOCAL_BLOGS_API  = "http://localhost:8001"
	LOCAL_AUTHOR_API = "http://localhost:8002"

	//mod-apis
	BLOG_API_ROUTES   = "/api/blogger-blogs"
	AUTHOR_API_ROUTES = "/api/blogger-authors"

	DATE_FORMAT = "2006-01-02"
)
