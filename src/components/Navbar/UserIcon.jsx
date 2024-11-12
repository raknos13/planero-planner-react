import { LuUser } from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts";

export function UserIcon({ onLogout }) {
  const { currentUser } = useAuth();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex items-center justify-center rounded-full h-8 w-8 trasnsition-colors duration-200
             hover:shadow-lg hover:bg-bg-hover transition-all"
        >
          {(
            <img
              src={currentUser.photoURL}
              alt="Profile photo"
              className="rounded-full h-fit w-fit"
            />
          ) || <LuUser size={26} />}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center gap-2">
            <img src={currentUser.photoURL} className="w-8 h-8 rounded-full" />
            <div>
              <div>{currentUser.displayName}</div>
              <div>{currentUser.email}</div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
