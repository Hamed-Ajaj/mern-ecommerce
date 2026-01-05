type LoadingProps = {
  label?: string
}

const Loading = ({ label = 'Loading' }: LoadingProps) => (
  <div
    role="status"
    aria-live="polite"
    className="flex items-center justify-center gap-3 rounded-[20px] border border-black/10 bg-white/80 px-6 py-8 text-sm text-stone-600"
  >
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black"
    />
    <span>{label}</span>
  </div>
)

export default Loading
