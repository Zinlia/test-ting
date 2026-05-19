package Logic

import (
	"wan-api-kol-event/DTO"
	"wan-api-kol-event/Initializers"
    "wan-api-kol-event/Models" 
    "wan-api-kol-event/Utils"
)

// * Get Kols from the database based on the range of pageIndex and pageSize
// ! USE GORM TO QUERY THE DATABASE
// ? There are some support function that can be access in Utils folder (/BE/Utils)
// --------------------------------------------------------------------------------
// @params: pageIndex
// @params: pageSize
// @return: List of KOLs and error message
func GetKolLogic(pageIndex, pageSize int64) ([]*DTO.KolDTO, error) {
    var kols []Models.Kol
    var totalCount int64
    offset := (pageIndex - 1) * pageSize

    if err := Initializers.DB.Model(&Models.Kol{}).Count(&totalCount).Error; err != nil {
        return nil, err
    }

    if err := Initializers.DB.
        Limit(int(pageSize)).
        Offset(int(offset)).
        Find(&kols).Error; err != nil {
        return nil, err
    }

	// Convert Models.Kol to DTO.KolDTO
    var kolDTOs []*DTO.KolDTO
    for _, kol := range kols {
        dto := &DTO.KolDTO{
            KolID:                kol.KolID,
            UserProfileID:        kol.UserProfileID,
            Language:             kol.Language,
            Education:            kol.Education,
            ExpectedSalary:       kol.ExpectedSalary,
            ExpectedSalaryEnable: kol.ExpectedSalaryEnable,
            ChannelSettingTypeID: kol.ChannelSettingTypeID,
            IDFrontURL:           kol.IDFrontURL,
            IDBackURL:            kol.IDBackURL,
            PortraitURL:          kol.PortraitURL,
            RewardID:             kol.RewardID,
            PaymentMethodID:      kol.PaymentMethodID,
            TestimonialsID:       kol.TestimonialsID,
            VerificationStatus:   Utils.BoolToStringStatus(kol.VerificationStatus, "Verified", "Pending"),
            Enabled:              kol.Enabled,
            ActiveDate:           kol.ActiveDate,
            Active:               kol.Active,
            CreatedBy:            kol.CreatedBy,
            CreatedDate:          kol.CreatedDate,
            ModifiedBy:           kol.ModifiedBy,
            ModifiedDate:         kol.ModifiedDate,
            IsRemove:             kol.IsRemove,
            IsOnBoarding:         kol.IsOnBoarding,
            Code:                 kol.Code,
            PortraitRightURL:     kol.PortraitRightURL,
            PortraitLeftURL:      kol.PortraitLeftURL,
            LivenessStatus:       Utils.BoolToStringStatus(kol.LivenessStatus, "Passed", "Failed"),
        }
        kolDTOs = append(kolDTOs, dto)
    }

	return kolDTOs, nil
}
