package authorViewHandler

import (
	"mod-middlend/pkg/domain/innerDomain/response"
	"mod-middlend/pkg/domain/outerDomain/author"
	"mod-middlend/pkg/useCases/Handlers/apiHandlers/authorApiHandler"
	"mod-middlend/pkg/useCases/Handlers/apiHandlers/blogApiHandler"
)

func GetAuthor(authorId int) (interface{}, response.Status) {
	apiAuthor, status := authorApiHandler.GetAuthorById(authorId)
	if status != response.SuccessfulSearch {
		return nil, status
	}

	apiBlogs, status := blogApiHandler.GetBlogsByAuthorId(authorId)
	if status != response.SuccessfulSearch {
		return nil, status
	}

	author := AuthorApiToView(apiAuthor)
	blogs := BlogsApiToView(author, apiBlogs)

	authorBlogs := AuthorViewToAuthorBlogsView(author, blogs)

	return authorBlogs, response.SuccessfulSearch
}

func GetAuthorByEmail(email string) (interface{}, response.Status) {

	//check if email is valid, and return it if it is
	email, status := authorApiHandler.GetAuthorByEmail(email)
	if status != response.SuccessfulSearch {
		return nil, status
	}

	return email, response.SuccessfulSearch
}

func RegisterAuthor(authorForm author.Author) response.Status {

	authorViewToAuhtorApi := AuthorViewToApi(authorForm)
	status := authorApiHandler.RegisterAuthor(authorViewToAuhtorApi)
	return status

}
