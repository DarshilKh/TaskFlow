export default function FilterBar({ filter, setFilter, total, done }) {
  const filters = [
    { key: 'all', label: 'ALL', count: total },
    { key: 'active', label: 'ACTIVE', count: total - done },
    { key: 'completed', label: 'DONE', count: done },
  ]

  return (
    <div className="flex items-center gap-1 mb-6">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all flex items-center gap-1.5
            ${filter === key
              ? 'bg-[var(--accent)] text-black'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]'
            }`}
        >
          {label}
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full
            ${filter === key ? 'bg-black/20 text-black' : 'bg-[var(--border)] text-[var(--text-muted)]'}`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  )
}
