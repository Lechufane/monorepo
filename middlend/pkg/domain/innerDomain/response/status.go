package response

import "net/http"

type StatusBody struct {
	Index int    `json:"index"`
	Name  string `json:"name"`
	Http  int    `json:"http"`
}

type Status int

const (
	// GeneralExceptions
	CustomResponse Status = iota
	InternalServerError
	NotFound
	BadRequest
	Conflict
	Unknown

	// UserExceptions
	InvalidEmail
	InvalidPassword
	InvalidUsername
	EmailAlreadyExists
	UsernameAlreadyExists
	Unauthorized
	Forbidden

	// JsonExceptions
	JsonDecodingError
	JsonEncodingError

	// SuccessfulCodes
	SuccessfulCreation
	SuccessfulDeletion
	SuccessfulUpdate
	SuccessfulSearch

	// FailureCodes
	FailedCreation
	FailedDeletion
	FailedUpdation
	FailedSearch

	ViewParsedSuccesfully

	SocketOperationSuccess
	SocketOperationFailed

	SuccessfulParse
	ParseFailed

	LoginApiError

	FranchiseApiError

	UserFound
	EmailNotFound

	AuthorApiError

	BlogApiError
)

var (
	statusMap = map[Status]StatusBody{
		CustomResponse:      {Index: 0, Name: "", Http: 0},
		InternalServerError: {Index: 1, Name: "InternalServerError", Http: http.StatusInternalServerError},
		NotFound:            {Index: 2, Name: "NotFound", Http: http.StatusNotFound},
		BadRequest:          {Index: 3, Name: "BadRequest", Http: http.StatusBadRequest},
		Conflict:            {Index: 4, Name: "Conflict", Http: http.StatusConflict},
		Unknown:             {Index: 5, Name: "Unknown", Http: http.StatusNotImplemented},

		InvalidEmail:          {Index: 6, Name: "InvalidEmail", Http: http.StatusBadRequest},
		InvalidPassword:       {Index: 7, Name: "InvalidPassword", Http: http.StatusBadRequest},
		InvalidUsername:       {Index: 8, Name: "InvalidUsername", Http: http.StatusBadRequest},
		EmailAlreadyExists:    {Index: 9, Name: "EmailAlreadyExists", Http: http.StatusConflict},
		UsernameAlreadyExists: {Index: 10, Name: "UsernameAlreadyExists", Http: http.StatusConflict},
		Unauthorized:          {Index: 11, Name: "Unauthorized", Http: http.StatusUnauthorized},
		Forbidden:             {Index: 12, Name: "Forbidden", Http: http.StatusForbidden},

		JsonDecodingError: {Index: 13, Name: "JsonDecodingError", Http: http.StatusInternalServerError},
		JsonEncodingError: {Index: 14, Name: "JsonEncodingError", Http: http.StatusInternalServerError},

		SuccessfulCreation: {Index: 15, Name: "SuccessfulCreation", Http: http.StatusCreated},
		SuccessfulDeletion: {Index: 16, Name: "SuccessfulDeletion", Http: http.StatusOK},
		SuccessfulUpdate:   {Index: 17, Name: "SuccessfulUpdate", Http: http.StatusOK},
		SuccessfulSearch:   {Index: 18, Name: "SuccessfulSearch", Http: http.StatusOK},

		FailedCreation: {Index: 19, Name: "FailedCreation", Http: http.StatusConflict},
		FailedDeletion: {Index: 20, Name: "FailedDeletion", Http: http.StatusConflict},
		FailedUpdation: {Index: 21, Name: "FailedUpdation", Http: http.StatusConflict},
		FailedSearch:   {Index: 22, Name: "FailedSearch", Http: http.StatusConflict},

		ViewParsedSuccesfully: {Index: 23, Name: "ViewParsedSuccesfully", Http: http.StatusOK},

		SocketOperationSuccess: {Index: 24, Name: "SocketOperationSuccess", Http: http.StatusOK},
		SocketOperationFailed:  {Index: 25, Name: "SocketOperationFailed", Http: http.StatusInternalServerError},

		SuccessfulParse: {Index: 26, Name: "SuccessfulParse", Http: http.StatusOK},
		ParseFailed:     {Index: 27, Name: "ParseFailed", Http: http.StatusConflict},

		LoginApiError: {Index: 28, Name: "LoginApiError", Http: http.StatusInternalServerError},

		UserFound:     {Index: 29, Name: "UserFound", Http: http.StatusOK},
		EmailNotFound: {Index: 30, Name: "EmailNotFound", Http: http.StatusNotFound},

		AuthorApiError: {Index: 31, Name: "AuthorApiError", Http: http.StatusInternalServerError},

		BlogApiError: {Index: 32, Name: "BlogApiError", Http: http.StatusInternalServerError},
	}
)

// Create custom response with custom message and status code
func SetCustomResponse(message string, statusCode int) Status {
	statusMap[0] = StatusBody{
		Index: 0,
		Name:  message,
		Http:  statusCode,
	}
	return 0
}

func (s Status) String() string {
	return statusMap[s].Name
}

func (s Status) Index() int {
	return statusMap[s].Index
}

func (s Status) StatusCode() int {
	return statusMap[s].Http
}
