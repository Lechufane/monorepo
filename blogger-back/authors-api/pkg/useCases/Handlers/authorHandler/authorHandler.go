package authorHandler

import (
	"blogger-author-api/internal/data/infrastructure/authorRepository"
	"blogger-author-api/pkg/domain/author"
	"blogger-author-api/pkg/domain/response"
)

type AuthorHandler struct {
	Repository authorRepository.Repository
}

type Handler interface {
	CreateAuthor(author author.Author) (interface{}, response.Status)
	GetAuthorById(authorId int) (interface{}, response.Status)
	GetAllAuthor() (interface{}, response.Status)
	UpdateAuthor(author author.Author) response.Status
	DeleteAuthorById(authorId int) response.Status
}

func (ah *AuthorHandler) CreateAuthor(author author.Author) (interface{}, response.Status) {
	return ah.Repository.CreateAuthor(&author)
}

func (ah *AuthorHandler) GetAuthorById(authorId int) (interface{}, response.Status) {
	return ah.Repository.GetAuthorById(authorId)
}

func (ah *AuthorHandler) GetAllAuthor() (interface{}, response.Status) {
	return ah.Repository.GetAllAuthor()
}

func (ah *AuthorHandler) UpdateAuthor(author author.Author) response.Status {
	return ah.Repository.UpdateAuthor(author)
}

func (ah *AuthorHandler) DeleteAuthorById(authorId int) response.Status {
	return ah.Repository.DeleteAuthorById(authorId)
}
