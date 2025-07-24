package com.it.sps.dto;


import jakarta.persistence.Id;
import lombok.Data;

@Data
public class ApplicantDto {

    private String idNo;
    private String idType;
    private String personalCorporate;
    private String firstName;
    private String lastName;
    private String fullName;
    private String telephoneNo;
    private String email;
    private String mobileNo;
    private String city;
    private String suburb;
    private String streetAddress;
    private String postalCode;
    private String preferredLanguage;

    public ApplicantDto() {
    }

    public ApplicantDto(String idNo, String idType, String personalCorporate, String firstName, String lastName, String fullName, String telephoneNo, String email, String mobileNo, String city, String suburb, String streetAddress, String postalCode, String preferredLanguage) {
        this.idNo = idNo;
        this.idType = idType;
        this.personalCorporate = personalCorporate;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.telephoneNo = telephoneNo;
        this.email = email;
        this.mobileNo = mobileNo;
        this.city = city;
        this.suburb = suburb;
        this.streetAddress = streetAddress;
        this.postalCode = postalCode;
        this.preferredLanguage = preferredLanguage;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getIdType() {
        return idType;
    }

    public void setIdType(String idType) {
        this.idType = idType;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getPersonalCorporate() {
        return personalCorporate;
    }

    public void setPersonalCorporate(String personalCorporate) {
        this.personalCorporate = personalCorporate;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getSuburb() {
        return suburb;
    }

    public void setSuburb(String suburb) {
        this.suburb = suburb;
    }

    public String getTelephoneNo() {
        return telephoneNo;
    }

    public void setTelephoneNo(String telephoneNo) {
        this.telephoneNo = telephoneNo;
    }

    public String getIdNo() {
        return idNo;
    }

    public void setIdNo(String idNo) {
        this.idNo = idNo;
    }
}
