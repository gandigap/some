import { Modal } from '../Modal/Modal';
import { ProductItemMore } from '../ProductItemMore/ProductItemMore';

interface Props {
  showModal: boolean;
  onClose: () => void;
}

function ProductModal({ showModal, onClose }: Props) {
  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
    >
      <ProductItemMore onClose={onClose} />
    </Modal>
  );
}

export { ProductModal };
