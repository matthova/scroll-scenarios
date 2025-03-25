"use client";
import * as React from "react";

export const range = (count: number): number[] => {
  return Array.from({ length: count }, (_, index) => index);
};

export default function HortToVert() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const touchMoveRef = React.useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch == null) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchMoveRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    if (touch == null) return;
    touchMoveRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = React.useCallback(() => {
    if (
      !touchStartRef.current ||
      !touchMoveRef.current ||
      !containerRef.current
    )
      return;

    const deltaX = touchMoveRef.current.x - touchStartRef.current.x;
    const deltaY = touchMoveRef.current.y - touchStartRef.current.y;

    // Threshold for minimum horizontal movement (in pixels)
    const HORIZONTAL_THRESHOLD = 50;

    // If horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // If movement exceeds threshold, scroll to the appropriate edge
      if (Math.abs(deltaX) > HORIZONTAL_THRESHOLD) {
        containerRef.current.scrollTo({
          left: deltaX > 0 ? 0 : containerRef.current.scrollWidth,
          behavior: "smooth",
        });
      } else {
        // If movement is insufficient, snap back to the closest edge
        const currentScroll = containerRef.current.scrollLeft;
        const maxScroll =
          containerRef.current.scrollWidth - containerRef.current.clientWidth;
        const isCloserToStart = currentScroll < maxScroll / 2;

        containerRef.current.scrollTo({
          left: isCloserToStart ? 0 : maxScroll,
          behavior: "smooth",
        });
      }
    }

    // Reset touch refs
    touchStartRef.current = null;
    touchMoveRef.current = null;
  }, []);

  return (
    // className="text-foreground w-full h-full overflow-x-scroll overflow-y-hidden overscroll-none"
    // className="w-[calc(200vw-21px)] h-full overflow-x-hidden overflow-y-scroll overscroll-none"
    <div className="w-full h-full bg-background text-foreground">
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="h-full border border-foreground overflow-x-scroll overflow-y-hidden overscroll-none"
      >
        <div className="w-full h-full overflow-y-scroll overscroll-none flex flex-col ">
          <div className="w-[50px] sticky left-0">ok</div>
          {range(100)
            .filter((i) => i % 2 == 0)
            .map((i) => (
              <React.Fragment key={i}>
                <div className="w-[150vw] relative">
                  <div className="flex">
                    <div className="flex-1 min-w-0 border border-foreground">
                      <div className="sticky top-[0px] bg-background z-10">
                        title a
                      </div>
                      <div className="p-16 flex items-center justify-center">
                        a{i}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 border border-foreground">
                      <div className="sticky top-[0px] bg-background z-10">
                        title b
                      </div>
                      <div className="p-16 flex items-center justify-center">
                        b{i}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}
