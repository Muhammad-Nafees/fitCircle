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
  phoneNumber: Yup.string().required('Phone number is required!'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .min(8, 'Confirm password must be at least 8 characters')
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Password must be same'),
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
