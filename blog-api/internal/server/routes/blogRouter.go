package routes

import (
	"blogger-blog-api/pkg/domain/blog"
	"blogger-blog-api/pkg/domain/response"
	"blogger-blog-api/pkg/useCases/Handlers/blogHandler"
	"blogger-blog-api/pkg/useCases/Helpers/responseHelper"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
)

type BlogRouter struct {
	Handler blogHandler.Handler
}

func (br *BlogRouter) GetAllBlog(w http.ResponseWriter, r *http.Request) {
	blogs, status := br.Handler.GetAllBlog()
	responseHelper.WriteResponse(w, status, blogs)
}

func (br *BlogRouter) GetBlogById(w http.ResponseWriter, r *http.Request) {
	blogId, err := strconv.Atoi(chi.URLParam(r, "blogId"))
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}
	blog, status := br.Handler.GetBlogById(blogId)

	responseHelper.WriteResponse(w, status, blog)
}

func (br *BlogRouter) UpdateBlog(w http.ResponseWriter, r *http.Request) {
	var blog blog.Blog
	err := json.NewDecoder(r.Body).Decode(&blog)
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}
	status := br.Handler.UpdateBlog(blog)
	responseHelper.WriteResponse(w, status, nil)
}

func (br *BlogRouter) CreateBlog(w http.ResponseWriter, r *http.Request) {
	var blog blog.Blog
	err := json.NewDecoder(r.Body).Decode(&blog)
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}
	createdBlog, status := br.Handler.CreateBlog(blog)
	responseHelper.WriteResponse(w, status, createdBlog)
}

func (br *BlogRouter) DeleteBlogById(w http.ResponseWriter, r *http.Request) {
	blogId, err := strconv.Atoi(chi.URLParam(r, "blogId"))
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}
	status := br.Handler.DeleteBlogById(blogId)
	responseHelper.WriteResponse(w, status, nil)
}

func (br *BlogRouter) GetAllBlogsByAuthorId(w http.ResponseWriter, r *http.Request) {
	authorId, err := strconv.Atoi(chi.URLParam(r, "authorId"))
	if err != nil {
		responseHelper.WriteResponse(w, response.BadRequest, nil)
		return
	}
	blogs, status := br.Handler.GetAllBlogsByAuthorId(authorId)
	responseHelper.WriteResponse(w, status, blogs)
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

	r.Get("/{blogId}", br.GetBlogById)
	r.Get("/", br.GetAllBlog)
	r.Get("/author/{authorId}", br.GetAllBlogsByAuthorId)

	r.Post("/", br.CreateBlog)

	r.Put("/", br.UpdateBlog)

	r.Delete("/{blogId}", br.DeleteBlogById)

	return r
}
