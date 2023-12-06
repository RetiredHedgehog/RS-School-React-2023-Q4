import { object, string, number, ref, boolean, mixed, InferType } from 'yup';

const userSchema = object().shape({
  name: string()
    .min(1)
    .transform((_, originValue) => originValue.toString().trim())
    .test('is-capitalized', 'NAME must be capitalized', (value) =>
      value ? /[A-Z]+/.test(value[0]) : false
    )
    .required('NAME is required'),
  age: number()
    .integer('AGE must be a whole number')
    .positive('AGE must be a positive number')
    .required('AGE is required'),
  email: string().email('ENAIL is invalid').required('EMAIL is required'),
  password: string()
    .min(4)
    .test(
      'is-strong-password',
      'PASSWORD must contain 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character',
      (value) =>
        value
          ? [/\d+/, /[A-Z]+/, /[a-z]+/, /[^\w&.\-]+/].every((reg) =>
              reg.test(value)
            )
          : false
    )
    .required('PASSWORD is required'),
  confirmPassword: string()
    .oneOf([ref('password'), undefined], 'PASSWORDS do not match')
    .required('PASSWORD confirmation is required'),
  gender: string().required('GENDER is required'),
  termsAndConditions: boolean()
    .transform((value, originValue) => (originValue === 'on' ? true : value))
    .oneOf([true], 'TERMS AND CONDITIONS must be accepted')
    .required('TERMS AND CONDITIONS must be accepted'),
  file: mixed()
    .test('is-format-supported', 'FILE format must be PNG/JPG/JPEG', (value) =>
      value && value instanceof File
        ? ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type)
        : false
    )
    .required('FILE must be provided'),
  country: string().required('COUNTRY must be selected'),
});

export type UserSchema = InferType<typeof userSchema>;
export default userSchema;
