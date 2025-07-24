package com.it.sps.controller;

import com.it.sps.dto.FormDataDto;
import com.it.sps.service.ApplicationWiringLDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private ApplicationWiringLDService applicationService;

    public ApplicationController(ApplicationWiringLDService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<?> submitApplication(@RequestBody FormDataDto formData) {
        try {
            if (!formData.getApplicationDto().getDeptId().matches("^\\d{3}\\.\\d{2}$")) {
                throw new IllegalArgumentException("Invalid Cost center number format");
            }

            // Save the application and get the generated applicationNo
            String applicationNo = applicationService.saveFullApplication(formData);

            // Return the applicationNo in the response
            return ResponseEntity.ok().body(Map.of(
                    "applicationNo", applicationNo,
                    "message", "Application submitted successfully"
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }


    //get the genarating applicationId
    @GetMapping("/new-id")
    public ResponseEntity<String> getNewApplicationId(@RequestParam String deptId) {
        String newAppId = applicationService.createNewApplicationId(deptId);
        return ResponseEntity.ok(newAppId);
    }

}