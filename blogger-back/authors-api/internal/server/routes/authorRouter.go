package routes

import (
	"blogger-author-api/pkg/domain/author"
	"blogger-author-api/pkg/domain/response"
	"blogger-author-api/pkg/useCases/Handlers/authorHandler"
	"blogger-author-api/pkg/useCases/Helpers/responseHelper"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
)

type AuthorRouter struct {
	Handler authorHandler.Handler
}

func (ar *AuthorRouter) GetAllAuthor(w http.ResponseWriter, r *http.Request) {
	authors, status := ar.Handler.GetAllAuthor()
	responseHelper.WriteResponse(w, status, authors)
}

func (ar *AuthorRouter) GetAuthorById(w http.ResponseWriter, r *http.Request) {
	authorId, err := strconv.Atoi(chi.URLParam(r, "authorId"))
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}
	author, status := ar.Handler.GetAuthorById(authorId)

	responseHelper.WriteResponse(w, status, author)
}

func (ar *AuthorRouter) UpdateAuthor(w http.ResponseWriter, r *http.Request) {
	var author author.Author
	err := json.NewDecoder(r.Body).Decode(&author)
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}
	status := ar.Handler.UpdateAuthor(author)
	responseHelper.WriteResponse(w, status, nil)
}

func (ar *AuthorRouter) CreateAuthor(w http.ResponseWriter, r *http.Request) {
	var author author.Author
	err := json.NewDecoder(r.Body).Decode(&author)
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}
	createdAuthor, status := ar.Handler.CreateAuthor(author)
	responseHelper.WriteResponse(w, status, createdAuthor)
}

func (ar *AuthorRouter) DeleteAuthorById(w http.ResponseWriter, r *http.Request) {
	authorId, err := strconv.Atoi(chi.URLParam(r, "authorId"))
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}
	status := ar.Handler.DeleteAuthorById(authorId)
	responseHelper.WriteResponse(w, status, nil)
}

func (ar *AuthorRouter) GetAuthorByEmail(w http.ResponseWriter, r *http.Request) {
	email := chi.URLParam(r, "email")
	author, status := ar.Handler.GetAuthorByEmail(email)
	responseHelper.WriteResponse(w, status, author)
}

func (ar *AuthorRouter) Routes() http.Handler {
	r := chi.NewRouter()

	// Basic CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:     []string{"https://*", "http://*"},
		AllowedMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:     []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:     []string{"Link"},
		AllowOriginFunc:    func(r *http.Request, origin string) bool { return true },
		AllowCredentials:   true,
		OptionsPassthrough: true,
		Debug:              true,
		MaxAge:             300,
	}))

	r.Get("/", ar.GetAllAuthor)
	r.Get("/{authorId}", ar.GetAuthorById)
	r.Get("/email/{email}", ar.GetAuthorByEmail)

	r.Post("/", ar.CreateAuthor)

	r.Put("/", ar.UpdateAuthor)

	r.Delete("/{authorId}", ar.DeleteAuthorById)

	return r
}
