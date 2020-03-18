import { User } from "@/models/interface";
import { useSelector } from "./use-redux";

export function useUser() {
    const user: User = useSelector(
        (state: any) => state.global.currentUser
    );
    return user;
}