package com.taskmanager.model;

import java.time.Instant;
import java.util.UUID;

public class Task {

    private String id;
    private String title;
    private boolean completed;
    private String createdAt;

    public Task() {}

    public Task(String title) {
        this.id = UUID.randomUUID().toString();
        this.title = title;
        this.completed = false;
        this.createdAt = Instant.now().toString();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
