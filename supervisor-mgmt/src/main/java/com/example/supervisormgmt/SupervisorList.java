package com.example.supervisormgmt;

import java.util.ArrayList;
import java.util.List;

public class SupervisorList {
    
    private List<Supervisor> supervisors;


    public SupervisorList() {
        supervisors = new ArrayList<>();
    }


    public List<Supervisor> getSupervisors() {
        return supervisors;
    }


    public void setSupervisors(List<Supervisor> supervisors) {
        this.supervisors = supervisors;
    }
    
    
}
