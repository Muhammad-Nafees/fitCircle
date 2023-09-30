// Dummy data for communities
const communitiesData = [
  {
    _id: '64a54086cf67495184122e66',
    membersCount: 17,
    name: 'Gym Humor',
    photo:
      'https://images.pexels.com/photos/11175794/pexels-photo-11175794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    _id: '64b12345cf67495184122e77',
    membersCount: 25,
    name: 'Travel Enthusiasts',
    photo:
      'https://images.pexels.com/photos/87651/earth-blue-planet-globe-87651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    _id: '64c67890cf67495184122e88',
    membersCount: 10,
    name: 'Tech Innovators',
    photo:
      'https://images.pexels.com/photos/57993/pexels-photo-57993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    _id: '64d24680cf67495184122e99',
    membersCount: 8,
    name: 'Cooking Lovers',
    photo:
      'https://images.pexels.com/photos/9510/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Dummy data for followers
const followersData = [
  {
    _id: '64ae8bd037daa1ca15632e2d',
    email: 'testxgz@gmail.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64ae8bd037daa1ca15632e2d_profileImage.jpg',
    username: 'test',
  },
  {
    _id: '64b5199b85ed6958d701b4a1',
    email: 'testxgz@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64b5199b85ed6958d701b4a1_profileImage.jpg',
    username: 'test',
  },
  {
    _id: '64b443db507cf41a08eed375',
    email: 'hell@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64b443db507cf41a08eed375_profileImage.jpg',
    username: 'test',
  },
  {
    _id: '64c12345d9e8c6b8f2345678',
    email: 'johndoe@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64c12345d9e8c6b8f2345678_profileImage.jpg',
    username: 'johndoe',
  },
];

// Dummy data for following
const followingData = [
  {
    _id: '64cde1f78b53a2d9e1234567',
    email: 'user123@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64cde1f78b53a2d9e1234567_profileImage.jpg',
    username: 'user123',
  },
  {
    _id: '64def2c89c74b3f0f2345678',
    email: 'user456@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64def2c89c74b3f0f2345678_profileImage.jpg',
    username: 'user456',
  },
  {
    _id: '64efg3d790124a5b1234567a',
    email: 'user789@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64efg3d790124a5b1234567a_profileImage.jpg',
    username: 'user789',
  },
  {
    _id: '64fgh4e6911ab6c1c1234567b',
    email: 'janedoe@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64fgh4e6911ab6c1c1234567b_profileImage.jpg',
    username: 'janedoe',
  },
];

const messageDummyData = [
  {
    id: '1',
    name: 'Isaac Butler',
    message: 'You:This morning I will be in the ...',
    messageCount: 8,
  },
  {
    id: '2',
    name: 'John Doe',
    message: 'Hey, how are you?',
    messageCount: 3,
  },
  {
    id: '3',
    name: 'Alice Johnson',
    message: 'Can we schedule a meeting?',
    messageCount: 5,
  },
  {
    id: '4',
    name: 'Ella Smith',
    message: 'I have some exciting news!',
    messageCount: 2,
  },
  {
    id: '5',
    name: 'Michael Brown',
    message: 'What time should we meet?',
    messageCount: 4,
  },
];

const tdeeCalculatorData = {
  bmi: 24.5,
  bmr: 1500,
  calorieDeficit: 300,
  dailyCalories: 1800,
  daysToReachGoal: 30,
  targetDate: '01/12/2023',
  tdee: 2000,
};

const nutritionistInfo = {
  name: 'Lindsey Middleton',
  role: 'Nutritionist',
  plans: [
    {
      planName: 'Weight Loss Meal Plan',
      price: '$100',
      description: 'For people who are losing weight',
    },
    {
      planName: 'Weight Gain Meal Plan',
      price: '$100',
      description: 'For people who are gaining weight',
    },
    {
      planName: 'Weight Gain Meal Plan',
      price: '$100',
      description: 'For people who are gaining weight',
    },
    {
      planName: 'Weight Gain Meal Plan',
      price: '$100',
      description: 'For people who are gaining weight',
    },
    {
      planName: 'Weight Gain Meal Plan',
      price: '$100',
      description: 'For people who are gaining weight',
    },
  ],
};

const nutritionistInfo2 = {
  name: 'Lindsey Middleton',
  role: '@lindseymiddleton',
  plans: [
    {
      planName: 'Weight Loss Meal Plan',
      price: '$100',
      description: 'For people who are losing weight',
    },
    {
      planName: 'Weight Gain Meal Plan',
      price: '$100',
      description: 'For people who are gaining weight',
    },
  ],
};

export const questionsAndAnswers = [
  {
    id: 1,
    question: 'How can I use Fit Circle?',
    answer:
      'This is a dummy answer for question 1. Replace it with your actual answer.',
  },
  {
    id: 2,
    question: 'Can I start Fit Circle App with a free month package?',
    answer:
      'This is a dummy answer for question 2. Replace it with your actual answer.',
  },
  {
    id: 3,
    question: 'Does Fit Circle App support earning skills badges?',
    answer:
      'Enter your email ID  or phone number associated with your account and we’ll send an verification code for reset your password',
  },
  {
    id: 4,
    question: 'How can I find a good workout?',
    answer:
      'This is a dummy answer for question 4. Replace it with your actual answer.',
  },
  {
    id: 5,
    question: 'What methods of payment does?',
    answer:
      'This is a dummy answer for question 5. Replace it with your actual answer.',
  },
];

export const dummyTransactions = [
  {
    id: 1,
    name: 'Isaac Buttler',
    date: '02 / 10 / 23',
    time: '10:30 AM',
    email: 'isaac@example.com',
    transactionType: 'negative',
    amount: '$50.00',
    type: 'Subscription',
    fullDate: 'October 2, 2023',
  },
  {
    id: 2,
    name: 'John Doe',
    date: '03 / 15 / 23',
    time: '11:45 AM',
    email: 'john@example.com',
    transactionType: 'negative',
    amount: '$30.00',
    type: 'Subscription',
    fullDate: 'March 15, 2023',
  },
  {
    id: 3,
    name: 'Jane Smith',
    date: '04 / 20 / 23',
    time: '09:15 AM',
    email: 'jane@example.com',
    transactionType: 'negative',
    amount: '$25.00',
    type: 'Subscription',
    fullDate: 'April 20, 2023',
  },
  {
    id: 4,
    name: 'Alice Johnson',
    date: '05 / 25 / 23',
    time: '02:00 PM',
    email: 'alice@example.com',
    transactionType: 'negative',
    amount: '$40.00',
    type: 'Subscription',
    fullDate: 'May 25, 2023',
  },
  {
    id: 5,
    name: 'Bob Wilson',
    date: '06 / 30 / 23',
    time: '03:30 PM',
    email: 'bob@example.com',
    transactionType: 'negative',
    amount: '$35.00',
    type: 'Subscription',
    fullDate: 'June 30, 2023',
  },
];

export {
  communitiesData,
  followersData,
  followingData,
  messageDummyData,
  tdeeCalculatorData,
  nutritionistInfo,
  nutritionistInfo2,
};
