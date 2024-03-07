package apiBlog

type Blog struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	Content  string `json:"content"`
	AuthorId int    `json:"authorId"`
}
