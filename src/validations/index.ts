import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[cC][oO][mM]$/, 'Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[cC][oO][mM]$/, 'Invalid email')
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
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  username: Yup.string().required('Username is required'),
  bio: Yup.string().required('Bio is required'),
  phone: Yup.string().required('Phone number is required'),
  country: Yup.string().required('Select country'),
  city: Yup.string().required('Select city'),
  gender: Yup.string().when('userRole', (st: any, schema: any) => {
    return st && st[0] === 'trainer'
      ? Yup.string().required()
      : Yup.string().strip();
  }),
  physicalInformation: Yup.string().required(
    'Physical Information is required!',
  ),
  dob: Yup.string()
  .matches(
    /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/,
    'Invalid date format. Must be mm/dd/yyyy',
  )
  .required(),

    hourlyRate: Yup.string().when('userRole', (st: any, schema: any) => {
    return st && st[0] === 'trainer'
      ? Yup.string().required()
      : Yup.string().strip();
  }),
});

export const genderSchema = Yup.object().shape({
  gender: Yup.string().required('Select gender'),
  age: Yup.string().required('Age is required'),
  height: Yup.string().required('Height is required'),
  weight: Yup.string().required('Weight is required'),
  bodytype: Yup.string().required('Select Body Type'),
  activity: Yup.string().required('Select Activity'),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[cC][oO][mM]$/, 'Invalid email')
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
