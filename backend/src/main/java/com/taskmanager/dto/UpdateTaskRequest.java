package com.taskmanager.dto;

import jakarta.validation.constraints.Size;

public class UpdateTaskRequest {

    private Boolean completed;

    @Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    private String title;

    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}
