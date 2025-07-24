package com.it.sps.controller;

import com.it.sps.dto.ApplicantDto;
import com.it.sps.entity.Applicant;
import com.it.sps.repository.ApplicantRepository;
import com.it.sps.service.ApplicantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applicants")
public class ApplicantController {

    private final ApplicantRepository applicantRepository;
    private final ApplicantService applicantService;

    public ApplicantController(ApplicantRepository applicantRepository, ApplicantService applicantService) {
        this.applicantRepository = applicantRepository;
        this.applicantService = applicantService;
    }

    @GetMapping("/{idNo}")
    public ResponseEntity<ApplicantDto> getApplicantById(@PathVariable String idNo) {
        ApplicantDto applicantDto = applicantRepository.findApplicantsByIdNo(idNo);

        if (applicantDto != null) {
            return new ResponseEntity<>(applicantDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @PostMapping
    public ResponseEntity<Applicant> addNewUser(@RequestBody ApplicantDto applicantDto) {
        Applicant applicant = applicantService.createApplicant(applicantDto);
        return new ResponseEntity<>(applicant, HttpStatus.CREATED);
    }


}