import style from './backButton.module.scss';

function BackButton() {
  return (
    <button
      data-cy="back"
      type="button"
      className={style.button}
    >
      Back
    </button>
  );
}

export { BackButton };
