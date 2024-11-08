import { LuUser } from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserIcon() {
  return (
    <>
      <DropdownMenu clas>
        <DropdownMenuTrigger>
          <button
            className="rounded-full trasnsition-colors duration-200 p-1
             hover:shadow-lg hover:bg-bg-hover transition-all"
            onClick={(prev) => setShowPopover(!prev)}
          >
            <LuUser size={26} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
