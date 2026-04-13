package com.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TaskRequest {

    @NotBlank(message = "Title must not be blank")
    @Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    private String title;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}
