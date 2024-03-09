package authorApiHandler

import (
	"mod-middlend/pkg/constants"
	"mod-middlend/pkg/domain/innerDomain/apiAuthor"
	"mod-middlend/pkg/domain/innerDomain/response"
	"mod-middlend/pkg/useCases/Helpers/requestHelper"
	"mod-middlend/pkg/useCases/Helpers/responseHelper"
	"net/http"
	"os"
	"strconv"
)

func GetAuthorById(authorId int) (apiAuthor.Author, response.Status) {
	getUrl := os.Getenv("AUTHORS_API") + constants.AUTHOR_API_ROUTES + "/author/" + strconv.Itoa(authorId)

	res, status := requestHelper.GetRequest(getUrl)
	if status != response.SuccessfulSearch {
		return apiAuthor.Author{}, response.AuthorApiError
	}

	if res.StatusCode != http.StatusOK {
		if res.StatusCode == http.StatusNotFound {
			return apiAuthor.Author{}, response.NotFound
		}
		return apiAuthor.Author{}, response.InternalServerError
	}

	var author apiAuthor.Author
	status = responseHelper.ParseResponseStruct(&author, res)
	if status != response.SuccessfulParse {
		return apiAuthor.Author{}, status
	}

	return author, response.SuccessfulSearch
}

func GetAuthorByEmail(email string) (string, response.Status) {

	// getUrl := constants.LOCAL_AUTHOR_API + constants.AUTHOR_API_ROUTES + "/author/email?email=" + email // This is for local testing. Comment this line of code when deploying.
	// fmt.Println(getUrl)

	getUrl := os.Getenv("AUTHORS_API") + constants.AUTHOR_API_ROUTES + "/author/email?email=" + email

	res, status := requestHelper.GetRequest(getUrl)
	if status != response.SuccessfulSearch {
		return "", response.AuthorApiError
	}

	if res.StatusCode != http.StatusOK {
		if res.StatusCode == http.StatusNotFound {
			return "", response.NotFound
		}
		return "", response.InternalServerError
	}

	return email, response.SuccessfulSearch
}
