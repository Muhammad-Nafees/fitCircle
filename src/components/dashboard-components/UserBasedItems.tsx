import ReadinessTestIcon from '../../../assets/icons/ReadinessTestIcon';
import ScheduleDashboardIcon from '../../../assets/icons/ScheduleDashboardIcon';
import TdeeCalculatorIcon from '../../../assets/icons/TdeeCalculatorIcon';

export const userBasedItems = [
  {
    text: 'Physical Activity Readiness',
    icon: <ReadinessTestIcon />,
    routeName: 'PhysicalReadiness',
  },
  {
    text: 'Total Daily Exercise Expenditure Calculator',
    icon: <TdeeCalculatorIcon />,
    routeName: 'TdeeCalculatorScreen',
  },
  {
    text: 'Schedule',
    icon: <ScheduleDashboardIcon />,
    routeName: 'UserSchedule',
  },
];
