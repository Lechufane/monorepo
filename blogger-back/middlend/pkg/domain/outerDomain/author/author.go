package author

import "mod-middlend/pkg/domain/outerDomain/blog"

type Author struct {
	Id       int         `json:"id"`
	Name     string      `json:"name"`
	Username string      `json:"username"`
	Email    string      `json:"email"`
	Blogs    []blog.Blog `json:"blogs"`
}
