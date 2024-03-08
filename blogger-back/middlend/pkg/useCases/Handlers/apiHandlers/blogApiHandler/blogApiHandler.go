package blogApiHandler

import (
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
