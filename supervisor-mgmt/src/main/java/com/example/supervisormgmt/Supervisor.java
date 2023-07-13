package com.example.supervisormgmt;

public class Supervisor {
    
    public Integer id;

    public String firstName;

    public String lastName;

    public String jurisdiction;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getJurisdiction() {
        return jurisdiction;
    }

    public void setJurisdiction(String jurisdiction) {
        this.jurisdiction = jurisdiction;
    }

    @Override
    public String toString() {
        return "Supervisor [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", jurisdiction="
                + jurisdiction + "]";
    }


    
}
