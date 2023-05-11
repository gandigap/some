import style from './formCardItem.module.scss';
import { capitalize } from '../../utils/stringHelpers';

export interface CardItem {
  id: number;
  firstName: string;
  lastName: string;
  date: string;
  country: string;
  gender: string | null;
  image: string;
  agreement: boolean;
}

interface FormCardItemProps {
  cardData: CardItem;
}

function FormCardItem({ cardData }: FormCardItemProps) {
  const { firstName, lastName, date, country, gender, image, agreement } = cardData;

  return (
    <article className={style.card}>
      <picture className={style.picture}>
        <source srcSet={image} />
        <img
          src={image}
          alt={`${firstName} ${lastName}`}
          loading="lazy"
        />
      </picture>
      <h3>
        {firstName} {lastName}
      </h3>
      <p>
        Birth Date: <span>{new Date(date).toDateString()}</span>
      </p>
      {gender && (
        <p>
          Gender: <span>{capitalize(gender)}</span>
        </p>
      )}
      <p>
        Country: <span>{capitalize(country)}</span>
      </p>
      <p>
        Accept private policy: <span>{agreement ? 'Yes' : 'No'}</span>
      </p>
    </article>
  );
}

export { FormCardItem };
