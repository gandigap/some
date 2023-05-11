import { useEffect } from 'react';
import style from './products.module.scss';
import { SearchForm } from '../SearchForm/SearchForm';
import { ProductItem } from '../ProductItem/ProductItem';
import { Preloader } from '../Preloader/Preloader';
import { useTypedDispatch, useTypedSelector } from '../../store/hooks';
import { fetchItems } from '../../store/slices/apiSlice';

function Products() {
  const { items, isPending, error } = useTypedSelector((state) => state.api);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (items.length || error) return;
    dispatch(fetchItems({}));
  }, [dispatch, items.length, error]);

  return (
    <>
      <SearchForm />
      {isPending && <Preloader />}
      <section className={style.products}>
        {error && (
          <div className={style.message}>
            <p>{error}</p>
          </div>
        )}
        {!isPending &&
          items.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
            />
          ))}
      </section>
    </>
  );
}

export { Products };
