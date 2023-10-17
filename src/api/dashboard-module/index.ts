import {
  IMacro,
  IPhysicalActivity,
  ITDEE,
} from '../../interfaces/user.interface';
import {api} from '../../api/utils/interceptor';

export const calculateTdee = async (reqData: ITDEE) => {
  console.log(reqData, 'from cal tdee reqpost');
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

// trainer pov

export const setSlots = async (reqData: any) => {
  const response = await api.post(`schedule/trainer/set-slots`, reqData);
  return response;
};

export const getTrainerSlots = async (date: string) => {
  const response = await api.get(
    `schedule/trainer/slots-by-date?scheduleDate=${date}`,
  );
  return response;
};

export const getTrainerSlotList = async (
  currentMonth: any,
  currentYear: any,
) => {
  const response = await api.get(
    `schedule/trainer/monthly-count?month=${currentMonth}&year=${currentYear}`,
  );
  return response;
};

// user pov

export const getTrainerSlotsByMonthForUser = async (
  month: number,
  year: number,
  trainerId: string,
) => {
  const response = await api.get(
    `schedule/monthly-count?month=${month}&year=${year}&trainer=${trainerId}`,
  );
  return response;
};

export const getTrainerAvailableSlotsByDateForUser = async (
  date: any,
  trainerId: string,
) => {
  const response = await api.get(
    `schedule/available-slots?scheduleDate=${date}&trainer=${trainerId}`,
  );
  return response;
};

export const bookTrainerSchedule = async (reqData: any) => {
  const response = await api.post(`schedule`, reqData);
  return response;
};

export const getUserBookings = async (scheduleDate: string) => {
  console.log(scheduleDate,"from booking apiii")
  const response = await api.get(
    `schedule/bookings?scheduleDate=${scheduleDate}`,
  );
  return response;
};
