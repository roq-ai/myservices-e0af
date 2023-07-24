import * as yup from 'yup';

export const procedureValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
});
