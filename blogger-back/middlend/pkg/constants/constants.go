package constants

import "os"

var (
	BLOGS_API  = os.Getenv("BLOG_API_URL")
	AUTHOR_API = os.Getenv("AUTHOR_API_URL")
)

const (

	//mod-apis
	BLOG_API_ROUTES   = "/api/blogger-blogs"
	AUTHOR_API_ROUTES = "/api/blogger-authors"

	DATE_FORMAT = "2006-01-02"
)
