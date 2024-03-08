package authorViewHandler

import (
	"mod-middlend/pkg/domain/innerDomain/response"
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
