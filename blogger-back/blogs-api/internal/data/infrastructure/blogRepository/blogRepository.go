package blogRepository

import (
	"blogger-blog-api/pkg/domain/blog"
	"blogger-blog-api/pkg/domain/response"
	databaseHelpers "blogger-blog-api/pkg/useCases/Helpers/databaseHelper"

	"gorm.io/gorm"
)

type BlogRepository struct {
}

type Repository interface {
	CreateBlog(blog *blog.Blog) (*blog.Blog, response.Status)
	GetAllBlog() ([]blog.Blog, response.Status)
	GetBlogById(blogId int) (blog.Blog, response.Status)
	UpdateBlog(blog blog.Blog) response.Status
	DeleteBlogById(blogId int) response.Status
	GetAllBlogsByAuthorId(authorId int) ([]blog.Blog, response.Status)
}

func (br *BlogRepository) CreateBlog(blog *blog.Blog) (*blog.Blog, response.Status) {
	db := databaseHelpers.Db
	result := db.Omit("id").Create(blog)
	if result.Error != nil {
		if result.Error.Error() == gorm.ErrDuplicatedKey.Error() {
			return blog, response.DBItemAlreadyExists
		}
		return blog, response.DBExecutionError
	}

	return blog, response.SuccessfulCreation
}

func (br *BlogRepository) GetAllBlog() ([]blog.Blog, response.Status) {
	var blogs []blog.Blog

	db := databaseHelpers.Db
	result := db.Find(&blogs)

	if err := result.Error; err != nil {
		if result.Error.Error() == gorm.ErrRecordNotFound.Error() {
			return blogs, response.BlogNotFound
		}
		return blogs, response.InternalServerError
	}

	return blogs, response.BlogFound
}

func (br *BlogRepository) GetBlogById(blogId int) (blog.Blog, response.Status) {
	var blog blog.Blog
	db := databaseHelpers.Db
	result := db.First(&blog, blogId)

	if err := result.Error; err != nil {
		if result.Error.Error() == gorm.ErrRecordNotFound.Error() {
			return blog, response.BlogNotFound
		}
		return blog, response.DBExecutionError
	}

	return blog, response.BlogFound
}

func (br *BlogRepository) UpdateBlog(blog blog.Blog) response.Status {
	db := databaseHelpers.Db
	result := db.Updates(&blog)
	if err := result.Error; err != nil {
		if result.Error.Error() == gorm.ErrRecordNotFound.Error() {
			return response.BlogNotFound
		}
		return response.DBExecutionError
	}
	return response.SuccessfulUpdate
}

func (br *BlogRepository) DeleteBlogById(blogId int) response.Status {
	db := databaseHelpers.Db
	result := db.Delete(&blog.Blog{}, blogId)
	if err := result.Error; err != nil {
		if result.Error.Error() == gorm.ErrRecordNotFound.Error() {
			return response.FailedSearch
		}
		return response.DBExecutionError
	}
	return response.SuccessfulDeletion
}

func (br *BlogRepository) GetAllBlogsByAuthorId(authorId int) ([]blog.Blog, response.Status) {
	var blogs []blog.Blog
	db := databaseHelpers.Db
	result := db.Where("author_id = ?", authorId).Find(&blogs)
	if err := result.Error; err != nil {
		if result.Error.Error() == gorm.ErrRecordNotFound.Error() {
			return blogs, response.BlogNotFound
		}
		return blogs, response.InternalServerError
	}

	return blogs, response.BlogFound
}
