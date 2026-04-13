import { useState, useEffect, useCallback } from 'react'
import { taskApi } from '../api/tasks'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await taskApi.getAll()
      // Sort newest first
      const sorted = [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setTasks(sorted)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const addTask = useCallback(async (title) => {
    const newTask = await taskApi.create(title)
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }, [])

  const toggleTask = useCallback(async (id, completed) => {
    const updated = await taskApi.update(id, { completed: !completed })
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
  }, [])

  const editTask = useCallback(async (id, title) => {
    const updated = await taskApi.update(id, { title })
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
  }, [])

  const removeTask = useCallback(async (id) => {
    await taskApi.delete(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { tasks, loading, error, addTask, toggleTask, editTask, removeTask, refetch: fetchTasks }
}
