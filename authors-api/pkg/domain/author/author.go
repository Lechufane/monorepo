package author

import (
	"time"

	"gorm.io/gorm"
)

type Author struct {
	Id        int            `json:"id"`
	Name      string         `json:"name"`
	Username  string         `json:"username"`
	Email     string         `json:"email"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeleteAt  gorm.DeletedAt `json:"deleteAt"`
}
