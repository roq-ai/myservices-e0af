import * as yup from 'yup';

export const addressValidationSchema = yup.object().shape({
  street: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
  customer_id: yup.string().nullable(),
});
