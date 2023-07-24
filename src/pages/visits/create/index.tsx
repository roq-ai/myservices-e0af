import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createVisit } from 'apiSdk/visits';
import { visitValidationSchema } from 'validationSchema/visits';
import { EquipmentInterface } from 'interfaces/equipment';
import { ProcedureInterface } from 'interfaces/procedure';
import { getEquipment } from 'apiSdk/equipment';
import { getProcedures } from 'apiSdk/procedures';
import { VisitInterface } from 'interfaces/visit';

function VisitCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VisitInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVisit(values);
      resetForm();
      router.push('/visits');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VisitInterface>({
    initialValues: {
      visit_date: new Date(new Date().toDateString()),
      equipment_id: (router.query.equipment_id as string) ?? null,
      procedure_id: (router.query.procedure_id as string) ?? null,
    },
    validationSchema: visitValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Visits',
              link: '/visits',
            },
            {
              label: 'Create Visit',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Visit
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="visit_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Visit Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.visit_date ? new Date(formik.values?.visit_date) : null}
              onChange={(value: Date) => formik.setFieldValue('visit_date', value)}
            />
          </FormControl>
          <AsyncSelect<EquipmentInterface>
            formik={formik}
            name={'equipment_id'}
            label={'Select Equipment'}
            placeholder={'Select Equipment'}
            fetcher={getEquipment}
            labelField={'name'}
          />
          <AsyncSelect<ProcedureInterface>
            formik={formik}
            name={'procedure_id'}
            label={'Select Procedure'}
            placeholder={'Select Procedure'}
            fetcher={getProcedures}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/visits')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'visit',
    operation: AccessOperationEnum.CREATE,
  }),
)(VisitCreatePage);
