package ViewModels

import "wan-api-kol-event/DTO"

type KolViewModel struct {
	Result         string        `json:"result"`
	ErrorMessage   string        `json:"errorMessage"`
	PageIndex      int64         `json:"pageIndex"`
	PageSize       int64         `json:"pageSize"`
	TotalCount     int64         `json:"totalCount"`
	KolInformation []*DTO.KolDTO `json:"KolInformation"`
}
