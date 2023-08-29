import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import {RootState} from '../redux/store';
import moment from 'moment';
const currentDate = moment();

const email = Yup.string()
  .matches(
    /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
    'Invalid email',
  )
  .required('Email is required');

export const loginSchema = Yup.object().shape({
  email: email,
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export const signupSchema = Yup.object().shape({
  email: email,
  phone: Yup.string().required('Phone number is required!'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .min(8, 'Confirm password must be at least 8 characters')
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Password must be same'),
});

export const signUpFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),
  email: email,
  phone: Yup.string().required('Phone number is required!'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

const ageLimit = 14;

export const createProfileSchema = (userRole: any) => {
  return Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required')
      .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),

    lastName: Yup.string()
      .required('Last Name is required')
      .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),
    username: Yup.string()
      .required('Username is required')
      .matches(/^[A-Za-z0-9]+$/, 'Invalid input: No spaces allowed'),
    bio: Yup.string()
      .required('Bio is required')
      .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),
    phone: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Select country'),
    city: Yup.string().required('Select city'),
    gender: Yup.string().test({
      name: 'gender',
      exclusive: true,
      message: 'Gender is required',
      test: value => {
        if (userRole === 'trainer') {
          return value !== undefined && value !== '';
        }
        return true;
      },
    }),
    physicalInformation: Yup.string()
      .required('Physical Information is required!')
      .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),
    dob: Yup.string()
      .matches(
        /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d\d$/,
        'Invalid date format. Must be dd/mm/yyyy',
      )
      .required()
      .test('date-of-birth', 'Invalid date of birth', function (value) {
        if (!value) {
          return true;
        }
        const dateOfBirth = moment(value, 'DD/MM/YYYY');

        if (!dateOfBirth.isValid()) {
          return this.createError({
            path: 'dob',
            message: 'Invalid date format.',
          });
        }

        const age = currentDate.diff(dateOfBirth, 'years');
        if (age < ageLimit) {
          return this.createError({
            path: 'dob',
            message: `Age must be greater than ${ageLimit} years.`,
          });
        }

        return true;
      }),
    hourlyRate: Yup.string().test({
      name: 'hourlyRate',
      exclusive: true,
      message: 'Hourly rate is required!',
      test: function (value) {
        if (userRole === 'trainer') {
          if (value === '0') {
            return this.createError({
              path: 'hourlyRate',
              message: 'Rate should be greater than 0',
            });
          }
          return value !== undefined;
        }
        return true;
      },
    }),
  });
};

export const genderSchema = Yup.object().shape({
  gender: Yup.string().required('Select gender'),
  age: Yup.number()
    .required('Age is required')
    .min(14, 'Age must be greater than 14')
    .max(99, 'Age must be less than 100'),
  height: Yup.string()
    .required('Height is required')
    .test('not-zero', 'Height must not be 0', value => !/^0/.test(value)),

  weight: Yup.string()
    .required('Weight is required')
    .test('not-zero', 'Weight must not be 0', value => !/^0/.test(value)),
  bodytype: Yup.string().required('Select Body Type'),
  activity: Yup.string().required('Select Activity'),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: email,
});

export const createNewPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmNewPassword: Yup.string()
    .min(8, 'Confirm password must be at least 8 characters')
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Password must be same'),
});

export const PhysicalReadinessTestSchema = Yup.object().shape({
  date: Yup.string()
    .matches(
      /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d\d$/,
      'Invalid date format. Must be dd/mm/yyyy',
    )
    .required('Date is required'),
  email: email,
  firstName: Yup.string()
    .required('First Name is required')
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),
  lastName: Yup.string()
    .required('Last Name is required')
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  zip: Yup.string().required('ZIP code is required'),
  homePhone: Yup.string().required('Home phone is required'),
  cellPhone: Yup.string().required('Cell phone is required'),
  age: Yup.number()
    .required('Age is required')
    .min(14, 'Age must be greater than 14')
    .max(99, 'Age must be less than 100'),
  height: Yup.string()
    .required('Height is required')
    .test('not-zero', 'Height must not be 0', value => !/^0/.test(value)),
  weight: Yup.string()
    .required('Weight is required')
    .test('not-zero', 'Weight must not be 0', value => !/^0/.test(value)),
});

export const PhysicalActivitySchema = Yup.object().shape({
  desiredBodyFat: Yup.number().required('This field is required'),
  desiredWeight: Yup.number().required('This field is required'),
  desiredLeanMuscle: Yup.number().required('This field is required'),
  exerciseFrequency: Yup.number().required('This field is required'),
});

export const TdeeCalculatorSchema = Yup.object().shape({
  gender: Yup.string().required('Select gender'),
  age: Yup.number()
    .required('Age is required')
    .min(14, 'Age must be greater than 14')
    .max(99, 'Age must be less than 100'),
  height: Yup.string()
    .required('Height is required')
    .test('not-zero', 'Height must not be 0', value => !/^0/.test(value)),
  weight: Yup.string()
    .required('Weight is required')
    .test('not-zero', 'Weight must not be 0', value => !/^0/.test(value)),
  goal: Yup.string().required('Select goal'),
  goalWeight: Yup.string()
    .required('Goal weight is required')
    .test('not-zero', 'Goal weight must not be 0', value => !/^0/.test(value)),
  caloriedeficit: Yup.string().required('Calorie deficit is required'),
  activityfactor: Yup.string().required('Activity Factor is required'),
});

// startDate: Yup.string()
//   .matches(
//     /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d\d$/,
//     'Invalid date format. Must be dd/mm/yyyy',
//   )
//   .required('Start date is required'),
