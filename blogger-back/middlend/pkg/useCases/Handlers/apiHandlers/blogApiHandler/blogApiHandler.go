package blogApiHandler

import (
	"fmt"
	"mod-middlend/pkg/constants"
	apiBlog "mod-middlend/pkg/domain/innerDomain/apiblog"
	"mod-middlend/pkg/domain/innerDomain/response"
	"mod-middlend/pkg/useCases/Helpers/requestHelper"
	"mod-middlend/pkg/useCases/Helpers/responseHelper"
	"net/http"
	"os"
	"strconv"
)

func GetBlogsByAuthorId(authorId int) ([]apiBlog.Blog, response.Status) {
	getUrl := os.Getenv("BLOGS_API") + constants.BLOG_API_ROUTES + "/blog/author/" + strconv.Itoa(authorId)

	res, status := requestHelper.GetRequest(getUrl)
	if status != response.SuccessfulSearch {
		return nil, response.BlogApiError
	}

	if res.StatusCode != http.StatusOK {
		if res.StatusCode == http.StatusNotFound {
			return nil, response.NotFound
		}
		return nil, response.InternalServerError
	}

	var blogs []apiBlog.Blog
	status = responseHelper.ParseResponseStruct(&blogs, res)
	if status != response.SuccessfulParse {
		return nil, status
	}

	return blogs, response.SuccessfulSearch
}

func GetAllBlogs() ([]apiBlog.Blog, response.Status) {
	getUrl := os.Getenv("BLOGS_API") + constants.BLOG_API_ROUTES + "/blog"

	res, status := requestHelper.GetRequest(getUrl)
	if status != response.SuccessfulSearch {
		return nil, response.BlogApiError
	}

	if res.StatusCode != http.StatusOK {
		if res.StatusCode == http.StatusNotFound {
			return nil, response.NotFound
		}
		return nil, response.InternalServerError
	}

	var blogs []apiBlog.Blog
	status = responseHelper.ParseResponseStruct(&blogs, res)
	if status != response.SuccessfulParse {
		return nil, status
	}

	return blogs, response.SuccessfulSearch
}

func GetBlog(blogId int) (apiBlog.Blog, response.Status) {
	getUrl := os.Getenv("BLOGS_API") + constants.BLOG_API_ROUTES + "/blog/" + strconv.Itoa(blogId)

	res, status := requestHelper.GetRequest(getUrl)
	if status != response.SuccessfulSearch {
		return apiBlog.Blog{}, response.BlogApiError
	}

	if res.StatusCode != http.StatusOK {
		if res.StatusCode == http.StatusNotFound {
			return apiBlog.Blog{}, response.NotFound
		}
		return apiBlog.Blog{}, response.InternalServerError
	}

	var blog apiBlog.Blog
	status = responseHelper.ParseResponseStruct(&blog, res)
	if status != response.SuccessfulParse {
		return apiBlog.Blog{}, status
	}

	return blog, response.SuccessfulSearch
}

func CreateBlog(blog apiBlog.BlogForm) response.Status {

	postUrl := constants.BLOGS_API + constants.BLOG_API_ROUTES + "/blog"
	fmt.Println(postUrl)

	res, status := requestHelper.PostRequest(postUrl, blog)
	if status != response.SuccessfulCreation {
		return response.BlogApiError
	}

	if res.StatusCode != http.StatusCreated {
		if res.StatusCode == http.StatusNotFound {
			return response.NotFound
		}
		return response.InternalServerError
	}

	return response.SuccessfulCreation
}
