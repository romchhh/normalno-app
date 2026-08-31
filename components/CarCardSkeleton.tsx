export default function CarCardSkeleton() {
  return (
    <div className="card animate-pulse flex flex-col h-full">
      <div className="w-full aspect-[4/3] bg-surface" />
      <div className="p-3 space-y-2 flex-1">
        <div className="h-3.5 bg-surface rounded w-4/5" />
        <div className="h-3.5 bg-surface rounded w-3/5" />
        <div className="h-3 bg-surface rounded w-1/2 mt-1" />
        <div className="h-4 bg-surface rounded w-1/3 mt-2" />
        <div className="h-3.5 bg-surface rounded w-2/5" />
      </div>
    </div>
  );
}
