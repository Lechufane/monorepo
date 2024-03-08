package blog

type Blog struct {
	Id             int    `json:"id"`
	AuthorName     string `json:"authorName"`
	AuthorUsername string `json:"authorUsername"`
	AuthorEmail    string `json:"authorEmail"`
	Image          string `json:"image"`
	Title          string `json:"title"`
	Content        string `json:"content"`
	CreatedAt      string `json:"createdAt"`
}
