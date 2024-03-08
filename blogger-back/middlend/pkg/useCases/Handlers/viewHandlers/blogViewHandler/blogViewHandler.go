package blogViewHandler

import (
	"mod-middlend/pkg/domain/innerDomain/response"
	"mod-middlend/pkg/domain/outerDomain/blog"
	"mod-middlend/pkg/useCases/Handlers/apiHandlers/authorApiHandler"
	"mod-middlend/pkg/useCases/Handlers/apiHandlers/blogApiHandler"
)

func GetBlogsByAuthorId(authorId int) (interface{}, response.Status) {
	blogs, status := blogApiHandler.GetBlogsByAuthorId(authorId)
	if status != response.SuccessfulSearch {
		return nil, status
	}

	author, status := authorApiHandler.GetAuthorById(authorId)
	if status != response.SuccessfulSearch {
		return nil, status
	}

	var blogsArray []blog.Blog
	for _, blog := range blogs {
		blog := BlogApiToBlogView(blog, author)
		blogsArray = append(blogsArray, blog)
	}

	return blogsArray, response.SuccessfulSearch
}

func GetAllBlogs() (interface{}, response.Status) {
	blogs, status := blogApiHandler.GetAllBlogs()
	if status != response.SuccessfulSearch {
		return nil, status
	}

	var blogsArray []blog.Blog
	for _, blog := range blogs {
		author, status := authorApiHandler.GetAuthorById(blog.AuthorId)
		if status != response.SuccessfulSearch {
			return nil, status
		}

		blog := BlogApiToBlogView(blog, author)
		blogsArray = append(blogsArray, blog)
	}

	return blogsArray, response.SuccessfulSearch
}

func GetBlog(blogId int) (interface{}, response.Status) {
	blog, status := blogApiHandler.GetBlog(blogId)
	if status != response.SuccessfulSearch {
		return nil, status
	}

	author, status := authorApiHandler.GetAuthorById(blog.AuthorId)
	if status != response.SuccessfulSearch {
		return nil, status
	}

	return BlogApiToBlogView(blog, author), response.SuccessfulSearch
}
