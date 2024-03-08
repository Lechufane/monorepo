package blogHandler

import (
	"blogger-blog-api/internal/data/infrastructure/blogRepository"
	"blogger-blog-api/pkg/domain/blog"
	"blogger-blog-api/pkg/domain/response"
)

type BlogHandler struct {
	Repository blogRepository.Repository
}

type Handler interface {
	CreateBlog(blog blog.Blog) (interface{}, response.Status)
	GetBlogById(blogId int) (interface{}, response.Status)
	GetAllBlog() (interface{}, response.Status)
	UpdateBlog(blog blog.Blog) response.Status
	DeleteBlogById(blogId int) response.Status
	GetAllBlogsByAuthorId(authorId int) (interface{}, response.Status)
}

func (bh *BlogHandler) CreateBlog(blog blog.Blog) (interface{}, response.Status) {
	return bh.Repository.CreateBlog(&blog)
}

func (bh *BlogHandler) GetBlogById(blogId int) (interface{}, response.Status) {
	return bh.Repository.GetBlogById(blogId)
}

func (bh *BlogHandler) GetAllBlog() (interface{}, response.Status) {
	return bh.Repository.GetAllBlog()
}

func (bh *BlogHandler) UpdateBlog(blog blog.Blog) response.Status {
	return bh.Repository.UpdateBlog(blog)
}

func (bh *BlogHandler) DeleteBlogById(blogId int) response.Status {
	return bh.Repository.DeleteBlogById(blogId)
}

func (bh *BlogHandler) GetAllBlogsByAuthorId(authorId int) (interface{}, response.Status) {
	return bh.Repository.GetAllBlogsByAuthorId(authorId)
}
