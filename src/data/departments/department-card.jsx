import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PencilLine, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import departImage from "@/assets/images/department.png";

function DepartmentCard({ row, onEdit, onDelete }) {

  return (
    <div className="grid grid-cols-12 gap-4 border-b border-b-gray-200 py-4">
      {/* Left Section: Image and Details */}
      <div className="col-span-10 flex gap-3 cursor-pointer">
        <Image
          src={row?.image || departImage}
          alt="department"
          height={69}
          width={62}
          loading="lazy"
          className="h-[69px] w-[62px] object-cover"
        />
        <div className="flex flex-col w-full gap-1">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-medium text-gray-700">
                {row?.title || "Default Title"}
              </h2>
            </div>
            <p className="text-xs text-gray-400 font-normal">
              {/* Placeholder for time or additional info */}
            </p>
          </div>
          <p className="text-xs text-gray-500 font-normal">{row?.description || "No description provided."}</p>
        </div>
      </div>

      {/* Right Section: Action Buttons */}
      <div className="col-span-2 flex items-center gap-2 justify-end">
        {onEdit && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button onClick={(e)=>{
                  onEdit(e,row)
                }} aria-label="Edit">
                  <PencilLine className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {onDelete && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button onClick={onDelete} aria-label="Delete">
                  <Trash2 className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}

export default DepartmentCard;
