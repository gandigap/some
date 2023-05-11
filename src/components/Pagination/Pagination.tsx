import { useTypedDispatch, useTypedSelector } from '../../store/hooks';
import { apiAction, fetchItems } from '../../store/slices/apiSlice';
import style from './Pagination.module.scss';

function Pagination() {
  const {
    info: { prev, next, pages, current },
  } = useTypedSelector((state) => state.api);
  const dispatch = useTypedDispatch();

  const getCurrent = () => {
    const [match] = current?.match(/(?<=page=)\d+/gi) || [1];
    const page = Number(match);
    return page;
  };

  const nextPage = () => {
    dispatch(apiAction.setCurrentPage(next));
    dispatch(fetchItems({ path: next }));
  };

  const prevPage = () => {
    dispatch(apiAction.setCurrentPage(prev));
    dispatch(fetchItems({ path: prev }));
  };

  return (
    <div className={style.pagination}>
      <button
        data-cy="prev"
        type="button"
        disabled={!prev}
        onClick={prevPage}
      >
        Prev
      </button>
      <section>
        <span>{getCurrent()}</span>/<span>{pages}</span>
      </section>
      <button
        data-cy="next"
        type="button"
        disabled={!next}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
}

export { Pagination };
