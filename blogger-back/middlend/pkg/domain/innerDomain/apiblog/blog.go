package apiBlog

type Blog struct {
	Id        int    `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	AuthorId  int    `json:"authorId"`
	CreatedAt string `json:"createdAt"`
	Image     string `json:"image"`
}

type BlogForm struct {
	Title    string `json:"title"`
	Content  string `json:"content"`
	AuthorId int    `json:"authorId"`
	Image    string `json:"image"`
}
