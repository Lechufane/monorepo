package blogViewHandler

import (
	apiBlog "mod-middlend/pkg/domain/innerDomain/apiblog"
	"mod-middlend/pkg/domain/outerDomain/blog"
)

func BlogApiToBlogView(blogApi apiBlog.Blog) blog.Blog {

	var blogResponse = blog.Blog{
		Id:       blogApi.Id,
		AuthorId: blogApi.AuthorId,
		Title:    blogApi.Title,
		Content:  blogApi.Content,
	}

	return blogResponse

}
