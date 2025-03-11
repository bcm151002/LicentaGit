package com.licenta.login.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendResetPasswordEmail(String toEmail, String resetToken) {
        try {
            String resetLink = "http://localhost:4200/reset-password?token=" + resetToken;
            String subject = "Reset Your Password";
            String body = "Click the link below to reset your password:\n" + resetLink;

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

//            System.out.println("Sending email to: " + toEmail);
            mailSender.send(message);
//            System.out.println("Email sent successfully to: " + toEmail);
        } catch (Exception e) {
//            System.err.println("Error sending email: " + e.getMessage());
//            e.printStackTrace();
        }
    }
}

