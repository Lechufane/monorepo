package blog

type Blog struct {
	Id       int    `json:"id"`
	AuthorId int    `json:"authorId"`
	Title    string `json:"title"`
	Content  string `json:"content"`
}
