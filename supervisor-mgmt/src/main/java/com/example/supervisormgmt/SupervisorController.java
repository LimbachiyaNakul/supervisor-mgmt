package com.example.supervisormgmt;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = {"http://localhost:4200","http://localhost:80"})
public class SupervisorController {


    @GetMapping("/api/supervisors")
    public ResponseEntity<List<String>> getSupervisors() {
        RestTemplate restTemplate = new RestTemplate();
       
        ResponseEntity<Supervisor[]> supervisorList = restTemplate.getForEntity("https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers", Supervisor[].class);
        Supervisor[] supervisorsArr = supervisorList.getBody();




        List<String> formattedSupervisors = Arrays.asList(supervisorsArr).stream()
                .filter(supervisor -> !supervisor.getJurisdiction().matches("\\d+"))
                .sorted(Comparator.comparing(Supervisor::getJurisdiction)
                        .thenComparing(Supervisor::getLastName)
                        .thenComparing(Supervisor::getFirstName))
                .map(supervisor -> supervisor.getJurisdiction() + " - " + supervisor.getLastName() + ", " + supervisor.getFirstName())
                .collect(Collectors.toList());

        return ResponseEntity.ok(formattedSupervisors);
    }

    @PostMapping("/api/submit")
    public ResponseEntity<?> submitNotificationRequest(@RequestBody NotificationRequest request) {
        if (request.getFirstName() == null || request.getLastName() == null || request.getSupervisor() == null 
        || request.getFirstName().trim().equals("") || request.getLastName().trim().equals("") || request.getSupervisor().trim().equals("")) {
            return ResponseEntity.ok("First name, last name, and supervisor fields are required.");
        }

        if (!request.getFirstName().matches("[a-zA-Z]+") || !request.getLastName().matches("[a-zA-Z]+")) {
            return ResponseEntity.ok("First name and last name must only contain letters.");
        }

        if (request.getEmail()!=null && !request.getEmail().trim().equals("") && !request.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")) {
            return ResponseEntity.ok("Use valid Email address");
        }

        if (request.getPhoneNumber()!=null && !request.getPhoneNumber().trim().equals("") && !request.getPhoneNumber().matches("\\d{10}|(?:\\d{3}-){2}\\d{4}|\\(\\d{3}\\)\\d{3}-?\\d{4}")) {
            return ResponseEntity.ok("Use valid Phone Number");
        }

        // Print the notification request information
        System.out.println("New Notification Request:");
        System.out.println("First Name: " + request.getFirstName());
        System.out.println("Last Name: " + request.getLastName());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Phone Number: " + request.getPhoneNumber());
        System.out.println("Supervisor: " + request.getSupervisor());
        System.out.println();

        return ResponseEntity.ok("Notification request submitted successfully.");
    }
}
