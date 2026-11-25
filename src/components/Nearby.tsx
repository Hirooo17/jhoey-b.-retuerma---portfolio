import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
class ExhibitBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export default function Nearby({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const anchor = useRef<HTMLDivElement>(null),
    [near, setNear] = useState(false);
  useEffect(() => {
    if (!anchor.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "450px" },
    );
    observer.observe(anchor.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={anchor}>
      <ExhibitBoundary fallback={fallback}>
        <Suspense fallback={fallback}>{near ? children : fallback}</Suspense>
      </ExhibitBoundary>
    </div>
  );
}
