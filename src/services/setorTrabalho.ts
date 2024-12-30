import { getRequest } from "../utils/axiosRequest";

export const getSelectSetorTrabalho = async () => {
    return await getRequest("SetorTrabalho/Select");
};
