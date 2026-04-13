package com.taskmanager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskmanager.dto.TaskRequest;
import com.taskmanager.dto.UpdateTaskRequest;
import com.taskmanager.model.Task;
import com.taskmanager.service.TaskService;
import com.taskmanager.exception.TaskNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    TaskService taskService;

    @Test
    void getAllTasks_returnsOk() throws Exception {
        Task t = new Task("Test task");
        when(taskService.getAllTasks()).thenReturn(List.of(t));

        mockMvc.perform(get("/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].title").value("Test task"));
    }

    @Test
    void createTask_withValidTitle_returnsCreated() throws Exception {
        Task t = new Task("New task");
        when(taskService.createTask(any())).thenReturn(t);

        TaskRequest req = new TaskRequest();
        req.setTitle("New task");

        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("New task"));
    }

    @Test
    void createTask_withBlankTitle_returnsBadRequest() throws Exception {
        TaskRequest req = new TaskRequest();
        req.setTitle("  ");

        mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    void updateTask_notFound_returns404() throws Exception {
        when(taskService.updateTask(eq("missing"), any()))
                .thenThrow(new TaskNotFoundException("missing"));

        UpdateTaskRequest req = new UpdateTaskRequest();
        req.setCompleted(true);

        mockMvc.perform(patch("/tasks/missing")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    void deleteTask_existingId_returnsOk() throws Exception {
        doNothing().when(taskService).deleteTask("some-id");

        mockMvc.perform(delete("/tasks/some-id"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }
}
