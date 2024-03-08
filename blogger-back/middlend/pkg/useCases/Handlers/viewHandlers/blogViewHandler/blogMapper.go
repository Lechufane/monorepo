package blogViewHandler

import (
	"mod-middlend/pkg/domain/innerDomain/apiAuthor"
	apiBlog "mod-middlend/pkg/domain/innerDomain/apiblog"
	"mod-middlend/pkg/domain/outerDomain/blog"
)

func BlogApiToBlogView(blogApi apiBlog.Blog, authorApi apiAuthor.Author) blog.Blog {

	var blogResponse = blog.Blog{
		Id:             blogApi.Id,
		Title:          blogApi.Title,
		Content:        blogApi.Content,
		AuthorName:     authorApi.Name,
		AuthorUsername: authorApi.Username,
		AuthorEmail:    authorApi.Email,
		CreatedAt:      blogApi.CreatedAt,
		Image:          blogApi.Image,
	}

	return blogResponse

}
