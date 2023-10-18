import CustomLoader from '../../components/shared-components/CustomLoader';
import {View, Text} from 'react-native';
import {CustomPlanDescription} from './CustomNutritionistPlan';
import {IMealPlan} from '../../interfaces/mealPlan.interface';

interface Props {
  isLoading: boolean;
  mealPlans: any;
  handleDeleteMealPlan?: any;
}

const NutritionisitPlanContainer = ({
  isLoading,
  mealPlans,
  handleDeleteMealPlan,
}: Props) => {
  return isLoading ? (
    <CustomLoader extraStyles={{marginTop: 30}} />
  ) : !mealPlans ? (
    <Text style={{color: 'white', paddingTop: 20}}>No Meal Plans yet!</Text>
  ) : (
    mealPlans?.map((plan: IMealPlan) => (
      <CustomPlanDescription
        key={plan._id}
        plan={plan}
        handleDeleteButton={() => handleDeleteMealPlan(plan._id)}
      />
    ))
  );
};

export default NutritionisitPlanContainer;
