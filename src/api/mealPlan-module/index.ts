import {api} from '../../api/utils/interceptor';

export const createMealPlan = async (reqData: any) => {
  let formData = new FormData();
  formData.append('title', reqData?.title);
  formData.append('description', reqData?.description);
  formData.append('pdf', reqData?.pdf);
  formData.append('cost', reqData?.cost);
  if (reqData?.username) {
    formData.append('username', reqData?.username);
  }
  const response = await api.post(`meal-plans`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
export const editMealPlan = async (reqData: any, mealPlanId: string) => {
  let formData = new FormData();
  formData.append('title', reqData?.title);
  formData.append('description', reqData?.description);
  formData.append('pdf', reqData?.pdf);
  formData.append('cost', reqData?.cost);
  if (reqData?.username) {
    formData.append('username', reqData?.username);
  }
  const response = await api.put(`meal-plans/${mealPlanId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const getAllMealPlans = async (page: number, limit: number) => {
  const response = await api.get(`meal-plans/all?page=${page}&limit=${limit}`);
  return response;
};

export const getMealPlansByNutritionist = async (
  page: number,
  limit: number,
  userId: string,
) => {
  const response = await api.get(
    `meal-plans?page=${page}&limit=${limit}&userId=${userId}`,
  );
  return response;
};

export const deleteMealPlanById = async (mealPlanId: string) => {
  const response = await api.delete(`meal-plans/${mealPlanId}`);
  return response;
};

export const searchNutritionist = async (role: string, search: string) => {
  const response = await api.get(
    `user/search-by-role?role=${role}&search=${search}`,
  );
  return response;
};
