import style from './statusMessage.module.scss';

interface StatusMessageProps {
  message: string;
}

function StatusMessage({ message }: StatusMessageProps) {
  return (
    <div
      data-cy="status-message"
      className={style.message}
    >
      {message}
    </div>
  );
}

export { StatusMessage };
