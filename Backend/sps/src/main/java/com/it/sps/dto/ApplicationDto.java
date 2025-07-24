package com.it.sps.dto;

public class ApplicationDto {
    private String applicationId;
    private String applicationNo;
    private String deptId;
    private String contactIdNo;
    private String contactName;
    private String contactAddress;
    private String contactTelephone;
    private String contactMobile;

    public String getApplicationNo() {return applicationNo; }

    public void setApplicationNo(String applicationNo) { this.applicationNo = applicationNo; }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getDeptId() {
        return deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
    }

    private String contactEmail;

    public String getContactIdNo() {
        return contactIdNo;
    }

    public void setContactIdNo(String contactIdNo) {
        this.contactIdNo = contactIdNo;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactAddress() {
        return contactAddress;
    }

    public void setContactAddress(String contactAddress) {
        this.contactAddress = contactAddress;
    }

    public String getContactTelephone() {
        return contactTelephone;
    }

    public void setContactTelephone(String contactTelephone) {
        this.contactTelephone = contactTelephone;
    }

    public String getContactMobile() {
        return contactMobile;
    }

    public void setContactMobile(String contactMobile) {
        this.contactMobile = contactMobile;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }
}

