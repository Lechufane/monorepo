package routes

import (
	"encoding/json"
	"mod-middlend/pkg/domain/innerDomain/response"
	"mod-middlend/pkg/domain/outerDomain/blogForm"
	"mod-middlend/pkg/useCases/Handlers/viewHandlers/blogViewHandler"
	"mod-middlend/pkg/useCases/Helpers/responseHelper"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
)

type BlogRouter struct {
}

func (br *BlogRouter) GetBlogsByAuthorId(w http.ResponseWriter, r *http.Request) {
	authorId, err := strconv.Atoi(chi.URLParam(r, "authorId"))
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}

	authorBlogs, status := blogViewHandler.GetBlogsByAuthorId(authorId)
	responseHelper.WriteResponse(w, status, authorBlogs)
}

func (br *BlogRouter) GetAllBlogs(w http.ResponseWriter, r *http.Request) {
	blogs, status := blogViewHandler.GetAllBlogs()
	responseHelper.WriteResponse(w, status, blogs)
}

func (br *BlogRouter) GetBlog(w http.ResponseWriter, r *http.Request) {
	blogId, err := strconv.Atoi(chi.URLParam(r, "blogId"))
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}

	blog, status := blogViewHandler.GetBlog(blogId)
	responseHelper.WriteResponse(w, status, blog)
}

func (br *BlogRouter) CreateBlog(w http.ResponseWriter, r *http.Request) {
	var blogForm blogForm.BlogForm
	err := json.NewDecoder(r.Body).Decode(&blogForm)
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}

	status := blogViewHandler.CreateBlog(blogForm)
	responseHelper.WriteResponse(w, status, nil)
}

func (br *BlogRouter) Routes() http.Handler {

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

	r.Get("/author/{authorId}", br.GetBlogsByAuthorId)
	r.Get("/", br.GetAllBlogs)
	r.Get("/{blogId}", br.GetBlog)

	r.Post("/", br.CreateBlog)

	return r
}
