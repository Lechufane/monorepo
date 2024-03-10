package authorViewHandler

import (
	"mod-middlend/pkg/domain/innerDomain/apiAuthor"
	apiBlog "mod-middlend/pkg/domain/innerDomain/apiblog"
	"mod-middlend/pkg/domain/outerDomain/author"
	"mod-middlend/pkg/domain/outerDomain/blog"
)

func AuthorApiToView(authorApi apiAuthor.Author) author.Author {
	var authorResponse = author.Author{
		Id:       authorApi.Id,
		Name:     authorApi.Name,
		Username: authorApi.Username,
		Email:    authorApi.Email,
	}

	return authorResponse
}

func AuthorViewToApi(authorView author.Author) apiAuthor.Author {
	var authorResponse = apiAuthor.Author{
		Id:       authorView.Id,
		Name:     authorView.Name,
		Username: authorView.Username,
		Email:    authorView.Email,
	}

	return authorResponse
}

func BlogsApiToView(authorView author.Author, blogsApi []apiBlog.Blog) []blog.Blog {
	var blogsResponse []blog.Blog
	for _, blogApi := range blogsApi {
		blogResponse := blog.Blog{
			Id:             blogApi.Id,
			Title:          blogApi.Title,
			Content:        blogApi.Content,
			AuthorName:     authorView.Name,
			AuthorUsername: authorView.Username,
			AuthorEmail:    authorView.Email,
			Image:          blogApi.Image,
			CreatedAt:      blogApi.CreatedAt,
		}
		blogsResponse = append(blogsResponse, blogResponse)
	}
	return blogsResponse
}

func AuthorViewToAuthorBlogsView(authorView author.Author, blogsView []blog.Blog) author.Author {
	var authorBlogsView = author.Author{
		Id:       authorView.Id,
		Name:     authorView.Name,
		Username: authorView.Username,
		Email:    authorView.Email,
		Blogs:    blogsView,
	}

	return authorBlogsView
}
