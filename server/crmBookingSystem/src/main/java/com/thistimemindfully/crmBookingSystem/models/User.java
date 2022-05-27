package com.thistimemindfully.crmBookingSystem.models;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "is_admin")
    private boolean isAdmin;

    @Column(name = "is_allowed_to_book")
    private boolean isAllowedToBook;

    public User(String email, String name) {
        this.email = email;
        this.name = name;
        this.isAdmin = false;
        this.isAllowedToBook = false;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isAllowedToBook() {
        return isAllowedToBook;
    }

    public void setAllowedToBook(boolean allowed) {
        isAllowedToBook = allowed;
    }
}