import { useState, useRef, useEffect } from 'react'

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const handleToggle = async () => {
    setBusy(true)
    setActionError(null)
    try {
      await onToggle(task.id, task.completed)
    } catch (err) {
      setActionError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    setBusy(true)
    setActionError(null)
    try {
      await onDelete(task.id)
    } catch (err) {
      setActionError(err.message)
      setBusy(false)
    }
  }

  const handleEditSubmit = async (e) => {
    e?.preventDefault()
    const trimmed = editValue.trim()
    if (!trimmed || trimmed === task.title) {
      setEditing(false)
      setEditValue(task.title)
      return
    }
    setBusy(true)
    setActionError(null)
    try {
      await onEdit(task.id, trimmed)
      setEditing(false)
    } catch (err) {
      setActionError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditing(false)
      setEditValue(task.title)
    }
  }

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <li className="task-enter group border border-[var(--border)] rounded-xl p-4
                   bg-[var(--surface)] hover:border-[var(--border-hover)] transition-all
                   hover:bg-[var(--surface-2)]">
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="pt-0.5">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.completed}
            onChange={handleToggle}
            disabled={busy}
            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <form onSubmit={handleEditSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleEditKeyDown}
                onBlur={handleEditSubmit}
                maxLength={200}
                className="flex-1 bg-[var(--surface-2)] border border-[var(--accent)] rounded-md
                           px-3 py-1 text-sm text-[var(--text-primary)] font-body
                           focus:outline-none"
              />
              <button
                type="submit"
                className="text-xs text-[var(--accent)] hover:text-[var(--accent-dim)]
                           font-mono transition-colors"
              >
                SAVE
              </button>
            </form>
          ) : (
            <div className="flex items-baseline gap-2 flex-wrap">
              <span
                className={`text-sm font-body leading-relaxed break-words transition-all ${
                  task.completed
                    ? 'line-through text-[var(--text-muted)]'
                    : 'text-[var(--text-primary)]'
                }`}
              >
                {task.title}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono flex-shrink-0">
                {formattedDate}
              </span>
            </div>
          )}

          {actionError && (
            <p className="mt-1 text-xs text-[var(--danger)] font-mono">{actionError}</p>
          )}
        </div>

        {/* Actions */}
        {!editing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={() => { setEditing(true); setEditValue(task.title) }}
              disabled={busy || task.completed}
              title="Edit task"
              className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)]
                         hover:bg-[var(--border)] transition-all disabled:opacity-30
                         disabled:cursor-not-allowed"
            >
              <PencilIcon />
            </button>
            <button
              onClick={handleDelete}
              disabled={busy}
              title="Delete task"
              className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--danger)]
                         hover:bg-[var(--border)] transition-all disabled:opacity-30
                         disabled:cursor-not-allowed"
            >
              {busy ? (
                <span className="inline-block w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <TrashIcon />
              )}
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}
