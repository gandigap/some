import { ErrorMessage } from '../components/CustomForm/ErrorMessage/ErrorMessage';

interface Props {
  cells: number;
}

const useFormErrorMessage = ({ cells }: Props) => {
  let key = 0;

  const showErrorMessage = (message?: string) => (
    <>
      {Array(cells - 1)
        .fill(0)
        .map(() => {
          key += 1;
          return <span key={key} />;
        })}
      <ErrorMessage message={message || ''} />
    </>
  );

  return { showErrorMessage };
};

export { useFormErrorMessage };
