package routes

import (
	"blogger-blog-api/internal/data/infrastructure/blogRepository"
	"blogger-blog-api/pkg/useCases/Handlers/blogHandler"
	"net/http"

	"github.com/go-chi/chi"
)

var (
	INTERNAL_SERVER_ERROR = []byte("500: Internal Server Error")
	ERR_ALREADY_COMMITTED = "already been committed"
)

func New() http.Handler {
	r := chi.NewRouter()

	br := BlogRouter{
		Handler: &blogHandler.BlogHandler{
			Repository: &blogRepository.BlogRepository{},
		},
	}

	r.Mount(`/blog`, br.Routes())

	return r
}
