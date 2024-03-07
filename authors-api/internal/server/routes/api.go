package routes

import (
	"blogger-author-api/internal/data/infrastructure/authorRepository"
	"blogger-author-api/pkg/useCases/Handlers/authorHandler"
	"net/http"

	"github.com/go-chi/chi"
)

var (
	INTERNAL_SERVER_ERROR = []byte("500: Internal Server Error")
	ERR_ALREADY_COMMITTED = "already been committed"
)

func New() http.Handler {
	r := chi.NewRouter()

	ar := AuthorRouter{
		Handler: &authorHandler.AuthorHandler{
			Repository: &authorRepository.AuthorRepository{},
		},
	}

	r.Mount("/author", ar.Routes())

	return r
}
