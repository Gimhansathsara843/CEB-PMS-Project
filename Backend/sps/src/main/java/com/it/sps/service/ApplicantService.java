package com.it.sps.service;

import com.it.sps.dto.ApplicantDto;
import com.it.sps.entity.Applicant;
import com.it.sps.repository.ApplicantRepository;
import org.springframework.stereotype.Service;

@Service
public class ApplicantService {

    private final ApplicantRepository applicantRepository;

    public ApplicantService(ApplicantRepository applicantRepository) {
        this.applicantRepository = applicantRepository;
    }


    private Applicant convertApplicantDTOtoEntity(ApplicantDto applicantDto) {

        Applicant applicant = new Applicant();
        applicant.setIdNo(applicantDto.getIdNo());
        applicant.setIdType(applicantDto.getIdType());
        applicant.setPersonalCorporate(applicantDto.getPersonalCorporate());
        applicant.setFirstName(applicantDto.getFirstName());
        applicant.setLastName(applicantDto.getLastName());
        applicant.setFullName(applicantDto.getFullName());
        applicant.setTelephoneNo(applicantDto.getTelephoneNo());
        applicant.setEmail(applicantDto.getEmail());
        applicant.setMobileNo(applicantDto.getMobileNo());
        applicant.setCity(applicantDto.getCity());
        applicant.setSuburb(applicantDto.getSuburb());
        applicant.setStreetAddress(applicantDto.getStreetAddress());
        applicant.setPostalCode(applicantDto.getPostalCode());
        applicant.setPreferredLanguage(applicantDto.getPreferredLanguage());

        return applicant;

    }

    public Applicant createApplicant(ApplicantDto applicantDto) {

        Applicant applicant = convertApplicantDTOtoEntity(applicantDto);
        return applicantRepository.save(applicant);

    }


}
