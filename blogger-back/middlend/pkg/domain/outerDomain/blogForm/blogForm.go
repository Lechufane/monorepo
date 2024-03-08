package blogForm

type BlogForm struct {
	AuthorId int    `json:"authorId"`
	Title    string `json:"title"`
	Content  string `json:"content"`
	Image    string `json:"image"`
}
