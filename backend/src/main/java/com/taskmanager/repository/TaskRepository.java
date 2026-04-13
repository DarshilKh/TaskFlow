package com.taskmanager.repository;

import com.taskmanager.model.Task;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class TaskRepository {

    private final Map<String, Task> store = new ConcurrentHashMap<>();

    public List<Task> findAll() {
        return new ArrayList<>(store.values());
    }

    public Optional<Task> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    public Task save(Task task) {
        store.put(task.getId(), task);
        return task;
    }

    public void deleteById(String id) {
        store.remove(id);
    }

    public boolean existsById(String id) {
        return store.containsKey(id);
    }
}
