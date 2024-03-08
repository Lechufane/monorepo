package blogViewHandler

import (
	"mod-middlend/pkg/domain/innerDomain/apiAuthor"
	apiBlog "mod-middlend/pkg/domain/innerDomain/apiblog"
	"mod-middlend/pkg/domain/outerDomain/blog"
	"mod-middlend/pkg/domain/outerDomain/blogForm"
)

func BlogApiToBlogView(blogApi apiBlog.Blog, authorApi apiAuthor.Author) blog.Blog {

	var blogResponse = blog.Blog{
		Id:             blogApi.Id,
		Title:          blogApi.Title,
		Content:        blogApi.Content,
		AuthorId:       blogApi.AuthorId,
		AuthorName:     authorApi.Name,
		AuthorUsername: authorApi.Username,
		AuthorEmail:    authorApi.Email,
		CreatedAt:      blogApi.CreatedAt,
		Image:          blogApi.Image,
	}

	return blogResponse
}

func BlogViewToBlogApi(blogView blogForm.BlogForm) apiBlog.BlogForm {
	var blogResponse = apiBlog.BlogForm{
		Title:    blogView.Title,
		Content:  blogView.Content,
		AuthorId: blogView.AuthorId,
		Image:    blogView.Image,
	}

	return blogResponse
}
