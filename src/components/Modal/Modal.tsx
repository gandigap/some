import { createPortal } from 'react-dom';
import { PropsWithChildren } from 'react';
import style from './Modal.module.scss';
import { Preloader } from '../Preloader/Preloader';
import { useTypedSelector } from '../../store/hooks';

interface Props extends PropsWithChildren {
  showModal: boolean;
  onClose: () => void;
}

function Modal({ showModal, onClose, children }: Props) {
  const { isPending } = useTypedSelector((state) => state.api.modal);

  if (!showModal) {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        className={style.overlay}
        onClick={onClose}
        data-testid="overlay"
        data-cy="overlay"
      />
      <div className={style.modal}>
        {isPending && <Preloader />}
        {!isPending && children}
      </div>
    </>,
    document.body
  );
}

export { Modal };
