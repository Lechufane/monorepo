package authorRepository

import (
	"blogger-author-api/pkg/domain/author"
	"blogger-author-api/pkg/domain/response"
	databaseHelpers "blogger-author-api/pkg/useCases/Helpers/databaseHelper"

	"gorm.io/gorm"
)

type AuthorRepository struct {
}

type Repository interface {
	CreateAuthor(author *author.Author) (*author.Author, response.Status)
	GetAllAuthor() ([]author.Author, response.Status)
	GetAuthorById(authorId int) (author.Author, response.Status)
	UpdateAuthor(author author.Author) response.Status
	DeleteAuthorById(authorId int) response.Status
	GetAuthorByEmail(email string) (author.Author, response.Status)
}

func (ar *AuthorRepository) CreateAuthor(author *author.Author) (*author.Author, response.Status) {
	db := databaseHelpers.Db
	result := db.Omit("id").Create(author)
	if result.Error != nil {
		if result.Error.Error() == gorm.ErrDuplicatedKey.Error() {
			return author, response.DBItemAlreadyExists
		}
		return author, response.DBExecutionError
	}

	return author, response.SuccessfulCreation
}

func (ar *AuthorRepository) GetAllAuthor() ([]author.Author, response.Status) {
	var authors []author.Author

	db := databaseHelpers.Db
	result := db.Find(&authors)

	if err := result.Error; err != nil {
		if result.Error.Error() == gorm.ErrRecordNotFound.Error() {
			return authors, response.AuthorNotFound
		}
		return authors, response.InternalServerError
	}

	return authors, response.AuthorFound
}

func (ar *AuthorRepository) GetAuthorById(authorId int) (author.Author, response.Status) {
	var author author.Author
	db := databaseHelpers.Db
	result := db.First(&author, authorId)

	if err := result.Error; err != nil {
		if result.Error.Error() == gorm.ErrRecordNotFound.Error() {
			return author, response.AuthorNotFound
		}
		return author, response.DBExecutionError
	}

	return author, response.AuthorFound
}

func (ar *AuthorRepository) UpdateAuthor(author author.Author) response.Status {
	db := databaseHelpers.Db
	result := db.Updates(&author)
	if err := result.Error; err != nil {
		if result.Error.Error() == gorm.ErrRecordNotFound.Error() {
			return response.AuthorNotFound
		}
		return response.DBExecutionError
	}
	return response.SuccessfulUpdate
}

func (ar *AuthorRepository) DeleteAuthorById(authorId int) response.Status {
	db := databaseHelpers.Db
	result := db.Delete(&author.Author{}, authorId)
	if err := result.Error; err != nil {
		if result.Error.Error() == gorm.ErrRecordNotFound.Error() {
			return response.FailedSearch
		}
		return response.DBExecutionError
	}
	return response.SuccessfulDeletion
}

func (ar *AuthorRepository) GetAuthorByEmail(email string) (author.Author, response.Status) {
	var author author.Author
	db := databaseHelpers.Db
	result := db.Where("email = ?", email).First(&author)

	if err := result.Error; err != nil {
		if result.Error.Error() == gorm.ErrRecordNotFound.Error() {
			return author, response.AuthorNotFound
		}
		return author, response.DBExecutionError
	}

	return author, response.AuthorFound
}
