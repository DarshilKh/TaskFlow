import { useState, useMemo } from 'react'
import { useTasks } from './hooks/useTasks'
import AddTaskForm from './components/AddTaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import ErrorBanner from './components/ErrorBanner'

export default function App() {
  const { tasks, loading, error, addTask, toggleTask, editTask, removeTask, refetch } = useTasks()
  const [filter, setFilter] = useState('all')

  const doneCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks])

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed)
    if (filter === 'completed') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filter])

  const progressPct = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center py-12 px-4">
      {/* Decorative background grain */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full max-w-xl relative">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-end justify-between mb-2">
            <h1 className="font-display text-7xl text-[var(--text-primary)] leading-none tracking-wide">
              TASK<span className="text-[var(--accent)]">FLOW</span>
            </h1>
            {tasks.length > 0 && (
              <div className="text-right pb-1">
                <span className="font-display text-3xl text-[var(--text-secondary)]">
                  {progressPct}%
                </span>
                <p className="text-xs text-[var(--text-muted)] font-mono -mt-1">COMPLETE</p>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {tasks.length > 0 && (
            <div className="h-[2px] bg-[var(--border)] rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-[var(--accent)] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}

          <p className="text-[var(--text-muted)] text-sm font-mono mt-3">
            {loading ? '—' : `${tasks.length} task${tasks.length !== 1 ? 's' : ''} · ${doneCount} done`}
          </p>
        </header>

        {/* Add form */}
        <AddTaskForm onAdd={addTask} />

        {/* Error */}
        {error && <ErrorBanner message={error} onRetry={refetch} />}

        {/* Filter */}
        {!loading && tasks.length > 0 && (
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            total={tasks.length}
            done={doneCount}
          />
        )}

        {/* Task list */}
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          filter={filter}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={removeTask}
        />
      </div>
    </div>
  )
}
