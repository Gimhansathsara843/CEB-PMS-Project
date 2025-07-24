package com.it.sps.repository;

import com.it.sps.dto.ApplicantDto;
import com.it.sps.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ApplicantRepository extends JpaRepository<Applicant, String> {

    @Query("SELECT new com.it.sps.dto.ApplicantDto(a.idNo, a.idType, a.personalCorporate, a.firstName, " +
            "a.lastName, a.fullName, a.telephoneNo, a.email, a.mobileNo, a.city, a.suburb, a.streetAddress, a.postalCode," +
            "a.preferredLanguage) FROM Applicant a WHERE a.idNo = ?1")
    ApplicantDto findApplicantsByIdNo(String applicantId);
}