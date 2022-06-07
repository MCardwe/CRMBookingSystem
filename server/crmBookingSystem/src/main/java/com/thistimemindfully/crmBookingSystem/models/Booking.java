package com.thistimemindfully.crmBookingSystem.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;


@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private String date;

    @Column(name = "time_slot")
    private String timeSlot;

    @Column(name = "host")
    private boolean host;

    @Column(name = "setup_type")
    private String setupType;

    @Column(name = "confidential")
    private boolean confidential;

    @Column(name = "confirmed")
    private boolean confirmed;

    @JsonIgnoreProperties({"bookings"})
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Booking(User user, String date, String timeSlot, boolean host, String setupType, boolean confidential) {
        this.date = date;
        this.timeSlot = timeSlot;
        this.host = host;
        this.setupType = setupType;
        this.confidential = confidential;
        this.confirmed = false;
        this.user = user;
    }

    public Booking() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public boolean isHost() {
        return host;
    }

    public void setHost(boolean host) {
        this.host = host;
    }

    public String getSetupType() {
        return setupType;
    }

    public void setSetupType(String setupType) {
        this.setupType = setupType;
    }

    public boolean isConfidential() {
        return confidential;
    }

    public void setConfidential(boolean confidential) {
        this.confidential = confidential;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
