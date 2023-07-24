import * as yup from 'yup';

export const visitValidationSchema = yup.object().shape({
  visit_date: yup.date().required(),
  equipment_id: yup.string().nullable(),
  procedure_id: yup.string().nullable(),
});
