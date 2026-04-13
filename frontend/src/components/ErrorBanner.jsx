export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="border border-[var(--danger)]/40 bg-[var(--danger)]/5 rounded-xl p-4 mb-6 flex items-start gap-3">
      <span className="text-[var(--danger)] text-lg mt-0.5 flex-shrink-0">⚠</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--danger)] font-mono">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-[var(--danger)] hover:text-[var(--danger-dim)] font-mono
                     underline underline-offset-2 flex-shrink-0 transition-colors"
        >
          RETRY
        </button>
      )}
    </div>
  )
}
