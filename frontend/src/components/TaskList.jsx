import TaskItem from './TaskItem'

export default function TaskList({ tasks, loading, onToggle, onEdit, onDelete, filter }) {
  if (loading) {
    return (
      <ul className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <li key={i} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--surface)]">
            <div className="flex items-center gap-3">
              <div className="skeleton w-5 h-5 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-3.5 rounded" style={{ width: `${60 + i * 12}%` }} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  if (tasks.length === 0) {
    const messages = {
      all: { emoji: '✦', text: 'No tasks yet. Add one above.' },
      active: { emoji: '◎', text: 'No active tasks.' },
      completed: { emoji: '✓', text: 'Nothing completed yet.' },
    }
    const msg = messages[filter] || messages.all

    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3 text-[var(--border-hover)]">{msg.emoji}</div>
        <p className="text-[var(--text-muted)] text-sm font-mono">{msg.text}</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
