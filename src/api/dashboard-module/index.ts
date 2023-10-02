import {
  IMacro,
  IPhysicalActivity,
  ITDEE,
} from '../../interfaces/user.interface';
import {api} from '../../api/utils/interceptor';

export const calculateTdee = async (reqData: ITDEE) => {
  const response = await api.post(`readings/tdee`, reqData);
  return response;
};

export const calculateMacro = async (reqData: IMacro) => {
  const response = await api.post(`readings/macro`, reqData);
  return response;
};

export const addPhysicalActivity = async (reqData: IPhysicalActivity) => {
  const response = await api.post(`readings/physical`, reqData);
  return response;
};

export const generateSlots = async () => {
  const response = await api.get(`schedule/get-all-slots`);
  return response;
};

export const setSlots = async (reqData: any) => {
  const response = await api.post(`schedule/trainer/set-slots`, reqData);
  return response;
};
