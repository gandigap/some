import style from './footer.module.scss';

function Footer() {
  return <footer className={style.footer}>{new Date().getFullYear()}</footer>;
}

export { Footer };
