package com.taskmanager.service;

import com.taskmanager.dto.TaskRequest;
import com.taskmanager.dto.UpdateTaskRequest;
import com.taskmanager.exception.TaskNotFoundException;
import com.taskmanager.model.Task;
import com.taskmanager.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    TaskRepository repo;
    TaskService service;

    @BeforeEach
    void setup() {
        repo = mock(TaskRepository.class);
        service = new TaskService(repo);
    }

    @Test
    void createTask_savesAndReturnsTask() {
        Task saved = new Task("Buy milk");
        when(repo.save(any())).thenReturn(saved);

        TaskRequest req = new TaskRequest();
        req.setTitle("Buy milk");

        Task result = service.createTask(req);

        assertThat(result.getTitle()).isEqualTo("Buy milk");
        verify(repo).save(any());
    }

    @Test
    void updateTask_notFound_throwsException() {
        when(repo.findById("bad-id")).thenReturn(Optional.empty());

        UpdateTaskRequest req = new UpdateTaskRequest();
        req.setCompleted(true);

        assertThatThrownBy(() -> service.updateTask("bad-id", req))
                .isInstanceOf(TaskNotFoundException.class);
    }

    @Test
    void updateTask_togglesCompleted() {
        Task existing = new Task("Write tests");
        when(repo.findById(existing.getId())).thenReturn(Optional.of(existing));
        when(repo.save(any())).thenAnswer(inv -> inv.getArgument(0));

        UpdateTaskRequest req = new UpdateTaskRequest();
        req.setCompleted(true);

        Task updated = service.updateTask(existing.getId(), req);

        assertThat(updated.isCompleted()).isTrue();
    }

    @Test
    void deleteTask_notFound_throwsException() {
        when(repo.existsById("nope")).thenReturn(false);

        assertThatThrownBy(() -> service.deleteTask("nope"))
                .isInstanceOf(TaskNotFoundException.class);
    }

    @Test
    void getAllTasks_returnsList() {
        when(repo.findAll()).thenReturn(List.of(new Task("A"), new Task("B")));

        List<Task> result = service.getAllTasks();

        assertThat(result).hasSize(2);
    }
}
