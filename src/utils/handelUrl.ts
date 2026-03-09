import { useNavigate } from "react-router-dom";
type UseHandleUrlParams = {
    lang: { code: string };
    key: string;
    set: (value: string) => void;
};
export const useHandelUrl = () => {
    const navigate = useNavigate();
    return ({ lang, set, key }: UseHandleUrlParams) => {
        if (lang) {
            set(lang.code.toLocaleLowerCase());
            navigate({ search: `?${key}=${lang.code}` });
        }
    };
};