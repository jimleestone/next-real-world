import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm, UseFormProps } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import Alert from '../common/alert';

type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  schema?: AnyObjectSchema;
  alert?: boolean; // use alert message on top of the form
} & UseFormProps<TFormValues>;

export default function Form<TFormValues extends Record<string, any>>({
  onSubmit,
  schema,
  defaultValues,
  mode,
  reValidateMode = 'onChange',
  alert = true,
  children,
}: FormProps<TFormValues>) {
  const methods = useForm<TFormValues>({
    defaultValues,
    mode,
    reValidateMode,
    resolver: schema && yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      {alert && <Alert />}
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
