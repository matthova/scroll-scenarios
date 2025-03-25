import * as React from "react";

const range = (count: number): number[] => {
  return Array.from({ length: count }, (_, index) => index);
};

export default function VertToHort() {
  return (
    <div className="w-full h-full bg-background text-foreground">
      <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-scroll touch-pan-y">
        <div className="w-full border border-foreground overflow-x-scroll touch-pan-x">
          {range(100).map((i) => (
            <React.Fragment key={i}>
              {i % 2 == 0 ? (
                <div className="w-[150%] relative">
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
              ) : (
                <div className="h-max sticky left-0 flex w-full justify-end">
                  ok
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
