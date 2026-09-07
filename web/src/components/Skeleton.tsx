import "./Skeleton.css";

export function SkeletonLines({ count = 3 }: { count?: number }) {
  return (
    <div className="skeleton-block" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-line" style={{ width: `${72 - i * 14}%` }} />
      ))}
    </div>
  );
}
