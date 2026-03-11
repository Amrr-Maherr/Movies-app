import React, { useEffect, useRef, useState } from "react";

interface LazyWrapperProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  height?: string | number;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  placeholder = null,
  height,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Check if already visible on mount (in case user scrolled)
    const rect = wrapperRef.current.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (alreadyVisible) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "500px" }
    );

    observer.observe(wrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      {isVisible ? children : placeholder || (
        <div style={{ height: typeof height === "number" ? `${height}px` : height || "200px", background: "#000" }} />
      )}
    </div>
  );
};

export default LazyWrapper;
