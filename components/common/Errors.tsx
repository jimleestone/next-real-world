export type GenericErrors = Record<string, string[]> | string[] | string;

export default function Errors({ errors }: { errors: GenericErrors }) {
  return (
    <ul className='error-messages' style={{ listStyleType: 'none' }}>
      {Array.isArray(errors) ? (
        <li key={errors[0]}>{errors[0]}</li>
      ) : typeof errors === 'string' ? (
        <li key={errors}>{errors}</li>
      ) : (
        Object.entries(errors).map(([field, fieldErrors]) =>
          fieldErrors.map((fieldError) => (
            <li key={field + String(fieldError)}>
              {field} {fieldError}
            </li>
          ))
        )
      )}
    </ul>
  );
}
