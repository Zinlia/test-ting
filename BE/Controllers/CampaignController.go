package Controllers

import (
	"net/http"
	"wan-api-kol-event/Const"
	"wan-api-kol-event/Logic"
	"wan-api-kol-event/ViewModels"
	"wan-api-kol-event/Utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetKolsController(context *gin.Context) {
	var KolsVM ViewModels.KolViewModel
	var guid = uuid.New().String()

	// extract pageIndex and pageSize from query params
	pageIndexStr := context.DefaultQuery("pageIndex", "1")
	pageSizeStr := context.DefaultQuery("pageSize", "100")

	// Convert to integers using helpers
	pageIndex := Utils.StringToInt64(pageIndexStr)
	pageSize := Utils.StringToInt64(pageSizeStr)

	// Validate
    if pageIndex < 1 {
        KolsVM.Result = Const.UnSuccess
        KolsVM.ErrorMessage = "Invalid pageIndex"
        KolsVM.PageIndex = 1
        KolsVM.PageSize = 100
        KolsVM.Guid = guid
        context.JSON(http.StatusBadRequest, KolsVM)
        return
    }

    if pageSize < 1 {
        KolsVM.Result = Const.UnSuccess
        KolsVM.ErrorMessage = "Invalid pageSize"
        KolsVM.PageIndex = pageIndex
        KolsVM.PageSize = 100
        KolsVM.Guid = guid
        context.JSON(http.StatusBadRequest, KolsVM)
        return
    }
	 
	// Call Logic Layer
	kols, error := Logic.GetKolLogic()
	if error != nil {
		KolsVM.Result = Const.UnSuccess
		KolsVM.ErrorMessage = error.Error()
		KolsVM.PageIndex = pageIndex  
		KolsVM.PageSize = pageSize  
		KolsVM.Guid = guid
		context.JSON(http.StatusInternalServerError, KolsVM)
		return
	}

	// Return successful response 
	KolsVM.Result = Const.Success
	KolsVM.ErrorMessage = ""
	KolsVM.PageIndex = pageIndex 
	KolsVM.PageSize = pageSize  
	KolsVM.Guid = guid
	KolsVM.KOL = kols
	KolsVM.TotalCount = int64(len(kols))
	context.JSON(http.StatusOK, KolsVM)
}
