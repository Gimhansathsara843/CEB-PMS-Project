package com.it.sps.dto;


public class FormDataDto {


    private ApplicationDto applicationDto;
    private WiringLandDetailDto wiringLandDetailDto;
    private ApplicantDto applicantDto;
    private ApplicationReferenceDto applicationReferenceDto;

    public ApplicationDto getApplicationDto() {
        return applicationDto;
    }

    public void setApplicationDto(ApplicationDto applicationDto) {
        this.applicationDto = applicationDto;
    }

    public WiringLandDetailDto getWiringLandDetailDto() {
        return wiringLandDetailDto;
    }

    public void setWiringLandDetailDto(WiringLandDetailDto wiringLandDetailDto) {
        this.wiringLandDetailDto = wiringLandDetailDto;
    }

    public ApplicantDto getApplicantDto() {
        return applicantDto;
    }

    public void setApplicantDto(ApplicantDto applicantDto) {
        this.applicantDto = applicantDto;
    }

    public ApplicationReferenceDto getApplicationReferenceDto() {
        return applicationReferenceDto;
    }

    public void setApplicationReferenceDto(ApplicationReferenceDto applicationReferenceDto) {
        this.applicationReferenceDto = applicationReferenceDto;
    }
}
