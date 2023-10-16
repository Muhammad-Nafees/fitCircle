export type NutritionData = {
  carbohydrates: number;
  proteins: number;
  fats: number;
  // user: string;
  // goal: string;
  carbRatio: number;
  proteinRatio: number;
  fatRatio: number;
  // carbGrams: number;
  // proteinGrams: number;
  // fatGrams: number;
  // _id: string;
  // __v: number;
};

export type ITimeSlot = {
  _id: string;
  endTime: Date;
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
};
