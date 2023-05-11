import style from './Preloader.module.scss';

function Preloader() {
  return (
    <div className={style.container}>
      <div className={style.ring}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export { Preloader };
