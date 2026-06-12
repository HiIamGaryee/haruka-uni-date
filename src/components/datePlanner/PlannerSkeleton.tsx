export function PlannerSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="shimmer h-4 w-1/3 rounded-lg bg-white/10" />
      <div className="shimmer h-8 w-2/3 rounded-xl bg-white/10" />
      <div className="space-y-3 pt-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="shimmer h-12 rounded-2xl bg-white/8" />
        ))}
      </div>
    </div>
  )
}
