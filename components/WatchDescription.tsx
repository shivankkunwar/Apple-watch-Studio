import { useAppSelector } from "@/lib/hooks";
import React from "react";

const WatchDescription = React.memo(() => {
  const { collection, size, selectedFace, band, totalPrice, selectedBand } =
    useAppSelector((state: any) => state.watch);

  return (
    <div className="flex flex-col w-[70%] md:w-[60%]">
      <span className="text-[#6e6e73] font-semibold tracking-[-.01em] mb-[4px] text-xs">
        {collection}
      </span>
      <span className="text-[#1d1d1f] font-semibold tracking-[-.016em] mb-[5px] overflow-hidden text-sm">
        {`${size.size} ${selectedFace.name} with ${band.name} ${selectedBand.name}`}
      </span>
      <span className="text-[#6e6e73] font-normal mb-[5px] tracking-[-.016em] overflow-hidden text-sm">
        {`From $${totalPrice}`}
      </span>
    </div>
  );
});

WatchDescription.displayName = "WatchDescription";

export default WatchDescription;

