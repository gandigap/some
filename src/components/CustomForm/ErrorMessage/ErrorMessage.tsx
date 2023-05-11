import style from './errorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      data-cy="form-error-message"
      className={style.error}
      data-testid="message"
    >
      {message}
    </div>
  );
}

export { ErrorMessage };
