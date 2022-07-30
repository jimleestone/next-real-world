import { yupResolver } from '@hookform/resolvers/yup';
import { DefaultValues, FormProvider, SubmitHandler, useForm, ValidationMode } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import Alert from '../common/alert';

interface FormProps<TFormValues> {
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  schema?: AnyObjectSchema;
  defaultValues?: DefaultValues<TFormValues>;
  mode?: keyof ValidationMode;
}

export default function Form<TFormValues extends Record<string, any>>({
  onSubmit,
  schema,
  defaultValues,
  mode,
  children,
}: FormProps<TFormValues>) {
  const methods = useForm<TFormValues>({ defaultValues, mode, resolver: schema && yupResolver(schema) });

  return (
    <FormProvider {...methods}>
      <Alert />
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
