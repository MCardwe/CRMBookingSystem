package com.thistimemindfully.crmBookingSystem.esender;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class EmailService {

    JavaMailSender emailSender;

    public EmailService(JavaMailSender emailSender){
        this.emailSender = emailSender;
    }

    public void sendMessage(String to, String subject, String text){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("maximillian.cardwell@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        this.emailSender.send(message);
    }
}
