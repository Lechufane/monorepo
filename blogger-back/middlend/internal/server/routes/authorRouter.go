package routes

import (
	"encoding/json"
	"mod-middlend/pkg/domain/outerDomain/author"
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

func (br *AuthorRouter) registerAuthor(w http.ResponseWriter, r *http.Request) {
	var authorForm author.Author
	err := json.NewDecoder(r.Body).Decode(&authorForm)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	status := authorViewHandler.RegisterAuthor(authorForm)
	responseHelper.WriteResponse(w, status, nil)

}

func (br *AuthorRouter) Routes() http.Handler {
	r := chi.NewRouter()

	r.Get("/{authorId}", br.GetBlogsByAuthorId)

	r.Get("/auth/check-email", br.GetAuthorByEmail)

	r.Post("/auth/register", br.registerAuthor)

	return r
}
