import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function DefaultPagination() {
  const [active, setActive] = React.useState(1);
  const [entriesToShow, setEntriesToShow] = React.useState(10);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === entriesToShow) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const handleShowEntries = (count) => {
    setEntriesToShow(count);
    setActive(1); 
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= entriesToShow; i++) {
      items.push(
        <IconButton
          key={i}
          className={`custom-box py-4 px-4 ${
            active === i
              ? 'border-blue-500 bg-[#F9F9F9] text-[#0A64F9]'
              : 'border-[#000] bg-white text-[#000]'
          }`}
          {...getItemProps(i)}
        >
          {i}
        </IconButton>
      );
    }
    return items;
  };


  return (
    <div className="flex flex-col items-start gap-1 pb-7">
    <div className="flex items-center gap-4 ml-auto">
    <div className="flex px-2 py-2 text-[14px] tracking-tight">Show
      <div className="custom-button px-4 py-2">{active}</div>
      </div>

        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> 
        </Button>
        <div className="flex items-center gap-2">{renderPaginationItems()}</div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === entriesToShow}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>

       
      </div>
     
      
    </div>
  );
}
