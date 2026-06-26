import React from "react";

export default function ORRoom() {
  return (
    <div className="relative w-full h-[720px] overflow-hidden rounded-3xl bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400">

      {/* Ceiling */}
      <div className="absolute top-0 left-0 w-full h-24 bg-slate-400" />

      {/* Floor */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-500" />

    </div>
  );
}