import style from './ProductItemMore.module.scss';
import { decapitalize } from '../../utils/stringHelpers';
import { useTypedSelector } from '../../store/hooks';

interface Props {
  onClose: () => void;
}

function ProductItemMore({ onClose }: Props) {
  const { item, error } = useTypedSelector((state) => state.api.modal);

  if (!item) {
    return (
      <>
        <button
          type="button"
          className={style.button}
          onClick={onClose}
          data-testid="close"
          data-cy="close"
        >
          &times;
        </button>
        <article className={style.product}>
          <h3>{error}</h3>
        </article>
      </>
    );
  }

  const {
    image,
    name,
    status,
    species,
    type,
    gender,
    origin: { name: originName },
    location: { name: locationName },
    episode,
    created,
  } = item;

  return (
    <>
      <button
        type="button"
        className={style.button}
        onClick={onClose}
        data-testid="close"
      >
        &times;
      </button>
      <article className={style.product}>
        <picture className={style.picture}>
          <source srcSet={image} />
          <img
            src={image}
            alt={name}
            loading="lazy"
          />
        </picture>
        <div className={style.description}>
          <h3>{name}</h3>
          <span className={`${style.status} ${style[decapitalize(status)]}`}>{status}</span>
        </div>
        <span>
          Species: <span>{species}</span>
        </span>
        {type && (
          <span>
            Type: <span>{type}</span>
          </span>
        )}
        <span>
          Gender: <span>{gender}</span>
        </span>
        <span>
          Origin: <span>{originName}</span>
        </span>
        <span>
          Location: <span>{locationName}</span>
        </span>
        <span>
          Episodes:
          <div className={style.list__container}>
            <span />
            <ul className={style.episodes}>
              {episode.map((series) => (
                <li key={series}>Episone #{series.split('/').at(-1)}</li>
              ))}
            </ul>
            <span />
          </div>
        </span>
        <span>
          Created: <span>{new Date(created).toLocaleString()}</span>
        </span>
      </article>
    </>
  );
}

export { ProductItemMore };
