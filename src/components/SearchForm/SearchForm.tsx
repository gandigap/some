import { ChangeEvent, FormEvent, useState } from 'react';
import { SearchLogo } from '../SearchLogo/SearchLogo';
import style from './searchForm.module.scss';
import { useTypedDispatch, useTypedSelector } from '../../store/hooks';
import { fetchItems, apiAction } from '../../store/slices/apiSlice';

function SearchForm() {
  const dispatch = useTypedDispatch();
  const { query } = useTypedSelector((state) => state.api);
  const [search, setSearch] = useState(query);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(apiAction.setSearchQuery({ query: search }));
    dispatch(apiAction.resetCurrent());
    dispatch(fetchItems({}));
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div className={style.container}>
      <form
        name="search-form"
        onSubmit={onSubmit}
        className={style.form}
      >
        <input
          type="text"
          name="search"
          placeholder="Search by name"
          spellCheck="false"
          // value={query}
          value={search}
          onChange={onChange}
        />
        <button
          type="submit"
          className={style.button}
        >
          <SearchLogo />
        </button>
      </form>
    </div>
  );
}

export { SearchForm };
