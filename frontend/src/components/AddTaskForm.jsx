import { useState } from 'react'

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    setSubmitting(true)
    setFormError(null)

    try {
      await onAdd(trimmed)
      setTitle('')
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (formError) setFormError(null)
          }}
          placeholder="Add a new task..."
          maxLength={200}
          disabled={submitting}
          className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3
                     text-[var(--text-primary)] placeholder-[var(--text-muted)] font-body text-sm
                     focus:outline-none focus:border-[var(--accent)] transition-colors
                     disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={submitting || !title.trim()}
          className="px-5 py-3 bg-[var(--accent)] text-black font-display text-lg tracking-wide
                     rounded-lg transition-all hover:bg-[var(--accent-dim)] active:scale-95
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
                     flex items-center gap-2 whitespace-nowrap"
        >
          {submitting ? (
            <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            '+ ADD'
          )}
        </button>
      </div>

      {formError && (
        <p className="mt-2 text-xs text-[var(--danger)] font-mono">{formError}</p>
      )}
    </form>
  )
}
