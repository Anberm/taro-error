import { useSelector } from "@tarojs/redux";

export function useSettings() {
    const settings = useSelector(
        (state: any) => state.global.settings,
    );
    return settings;
}