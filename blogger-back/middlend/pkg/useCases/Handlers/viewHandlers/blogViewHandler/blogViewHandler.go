package blogViewHandler

import (
	"mod-middlend/pkg/domain/innerDomain/response"
	"mod-middlend/pkg/domain/outerDomain/blog"
	"mod-middlend/pkg/useCases/Handlers/apiHandlers/blogApiHandler"
)

func GetBlogsByAuthorId(authorId int) (interface{}, response.Status) {

	blogs, status := blogApiHandler.GetBlogsByAuthorId(authorId)
	if status != response.SuccessfulSearch {
		return nil, status
	}

	var blogsArray []blog.Blog
	for _, blog := range blogs {
		blog := BlogApiToBlogView(blog)
		blogsArray = append(blogsArray, blog)
	}

	return blogsArray, response.SuccessfulSearch
}
