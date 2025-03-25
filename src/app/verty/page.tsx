"use client";

import { longText } from "@/text";
import React from "react";
import { useInView } from "react-intersection-observer";

const range = (count: number): number[] => {
  return Array.from({ length: count }, (_, index) => index);
};

export default function ScrollScenarios() {
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-scroll">
      {range(3).map((i) => (
        <VertMessagePair key={i} index={i} />
      ))}
    </div>
  );
}

function VertMessagePair({ index }: { index: number }) {
  const { ref: messageARef, inView: messageAInView } = useInView();
  const { ref: messageBRef, inView: messageBInView } = useInView();
  const messageAScrollRef = React.useRef<HTMLDivElement>(null);
  const messageBScrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col w-full relative">
      {messageAInView || messageBInView ? (
        <div
          onClick={() => {
            messageAScrollRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "start",
            });
          }}
          className="sticky top-0 w-full bg-background border z-10"
        >{`${index}-A`}</div>
      ) : null}
      <div
        className="p-4"
        ref={(ref) => {
          messageARef(ref);
          messageAScrollRef.current = ref;
        }}
      >
        {longText}
      </div>
      {messageAInView || messageBInView ? (
        <div
          onClick={() => {
            messageBScrollRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "nearest",
            });
          }}
          className={`sticky ${
            messageBInView ? "top-[26px]" : "bottom-0"
          } w-full bg-background border z-10`}
        >{`${index}-B`}</div>
      ) : null}
      <div
        className="px-4"
        ref={(ref) => {
          messageBRef(ref);
          messageBScrollRef.current = ref;
        }}
      >
        {longText}
      </div>
    </div>
  );
}
