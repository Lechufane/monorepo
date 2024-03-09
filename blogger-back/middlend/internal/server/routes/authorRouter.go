package routes

import (
	"mod-middlend/pkg/useCases/Handlers/viewHandlers/authorViewHandler"
	"mod-middlend/pkg/useCases/Helpers/responseHelper"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
)

type AuthorRouter struct {
}

func (br *AuthorRouter) GetBlogsByAuthorId(w http.ResponseWriter, r *http.Request) {
	authorId, err := strconv.Atoi(chi.URLParam(r, "authorId"))
	if err != nil {
		http.Error(w, "Invalid authorId", http.StatusBadRequest)
		return
	}

	author, status := authorViewHandler.GetAuthor(authorId)
	responseHelper.WriteResponse(w, status, author)
}

func (br *AuthorRouter) GetAuthorByEmail(w http.ResponseWriter, r *http.Request) {
	email := r.URL.Query().Get("email")
	if email == "" {
		http.Error(w, "Invalid email", http.StatusBadRequest)
		return
	}

	author, status := authorViewHandler.GetAuthorByEmail(email)
	responseHelper.WriteResponse(w, status, author)
}

func (br *AuthorRouter) Routes() http.Handler {
	r := chi.NewRouter()

	r.Get("/{authorId}", br.GetBlogsByAuthorId)
	r.Get("/email", br.GetAuthorByEmail)

	return r
}
