import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/,
      'Invalid email',
    )
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/,
      'Invalid email',
    )
    .required('Email is required'),
  phone: Yup.string().required('Phone number is required!'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .min(8, 'Confirm password must be at least 8 characters')
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Password must be same'),
});

export const profileSchema = Yup.object().shape({
  userRole: Yup.string().oneOf(['user', 'trainer']),
  firstName: Yup.string()
    .required('First Name is required')
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),

  lastName: Yup.string()
    .required('Last Name is required')
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),
  username: Yup.string()
    .required('Username is required')
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),
  bio: Yup.string()
    .required('Bio is required')
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),
  phone: Yup.string().required('Phone number is required'),
  country: Yup.string().required('Select country'),
  city: Yup.string().required('Select city'),
  gender: Yup.string().when('userRole', (st: any, schema: any) => {
    return st && st[0] === 'trainer'
      ? Yup.string().required()
      : Yup.string().strip();
  }),
  physicalInformation: Yup.string()
    .required('Physical Information is required!')
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Invalid input'),
  dob: Yup.string()
    .matches(
      /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d\d$/,
      'Invalid date format. Must be dd/mm/yyyy',
    )
    .required(),

  hourlyRate: Yup.string().when('userRole', (st: any, schema: any) => {
    return st && st[0] === 'trainer'
      ? Yup.string().required().min(1, 'Hourly Rate is required')
      : Yup.string().strip();
  }),
});

export const genderSchema = Yup.object().shape({
  gender: Yup.string().required('Select gender'),
  age: Yup.number()
    .required('Age is required')
    .min(14, 'Age must be greater than 14'),
  height: Yup.string().required('Height is required'),
  weight: Yup.string().required('Weight is required'),
  bodytype: Yup.string().required('Select Body Type'),
  activity: Yup.string().required('Select Activity'),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/,
      'Invalid email',
    )
    .required('Email is required'),
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
