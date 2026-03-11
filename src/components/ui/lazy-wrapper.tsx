import React, { useEffect, useRef, useState } from "react";

interface LazyWrapperProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  height?: string | number;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  placeholder = null,
  threshold = 0.1,
  rootMargin = "0px",
  height,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(wrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={wrapperRef}>
      {isVisible ? children : placeholder || (
        <div style={{ height: typeof height === "number" ? `${height}px` : height || "200px", background: "#000" }} />
      )}
    </div>
  );
};

export default LazyWrapper;
