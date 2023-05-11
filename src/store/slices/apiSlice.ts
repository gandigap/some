import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../components/ProductItem/ProductItem';
import { customFetch } from '../../utils/customFetch';
import { paths } from '../../routers/Paths';
import { FetchResponse, FetchResponseInfo } from '../../hooks/useCustomFetch';
import { RootState } from '../store';

interface ItemPayload {
  item: Product;
}

interface Info extends Omit<FetchResponseInfo, 'count'> {
  current: string | null;
}

interface ApiState {
  modal: {
    error?: string;
    item: Product | null;
    isPending: boolean;
  };
  items: Product[];
  isPending: boolean;
  error?: string;
  query?: string;
  info: Info;
}

interface ThunkParams {
  path?: string | null;
  query?: string;
  id?: number;
}

type RejectMessage = Pick<ApiState, 'error'>;

type ItemResponse = ItemPayload & RejectMessage;

interface DefaultState {
  state: ApiState;
  items: Product[];
  error?: string;
  isPending: boolean;
  info?: Info;
}

type ReplaceState = (props: DefaultState) => void;

const fetchItems = createAsyncThunk<
  FetchResponse,
  ThunkParams,
  { rejectValue: RejectMessage; state: RootState }
>('api/fetchItems', async ({ path }, { rejectWithValue, getState }) => {
  const {
    query,
    info: { current },
  } = getState().api;
  const params = `?name=${query}`;
  const data = await customFetch<FetchResponse>({
    url: path || current || `${paths.serverUrl}/${params}`,
  });
  if (data.error) return rejectWithValue(data);
  return data;
});

const fetchItemById = createAsyncThunk<ItemResponse, ThunkParams, { rejectValue: RejectMessage }>(
  'api/fetchItemById',
  async ({ id }, { rejectWithValue }) => {
    const data = await customFetch<Product & RejectMessage>({
      url: `${paths.serverUrl}/${id}`,
    });
    if (data.error) return rejectWithValue(data);
    return { item: data };
  }
);

const replaceState: ReplaceState = ({ state, items, error, isPending, info }) => {
  state.items = items;
  state.error = error;
  state.isPending = isPending;
  state.info = info || state.info;
};

const apiSlice = createSlice({
  name: 'api',
  initialState: <ApiState>{
    modal: {
      item: null,
      isPending: false,
    },
    items: [],
    isPending: false,
    error: '',
    query: '',
    current: '',
    info: { next: null, prev: null, pages: 0, current: null },
  },
  reducers: {
    setSearchQuery(state, action: PayloadAction<Pick<ThunkParams, 'query'>>) {
      state.query = action.payload.query;
    },
    setCurrentPage(state, action: PayloadAction<string | null>) {
      state.info.current = action.payload;
    },
    resetCurrent(state) {
      state.info.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      replaceState({ state, items: [], error: '', isPending: true });
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      replaceState({
        state,
        items: action.payload.results,
        error: '',
        isPending: false,
        info: {
          ...action.payload.info,
          current: state.info.current || null,
        },
      });
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      replaceState({
        state,
        items: [],
        error: action.payload?.error,
        isPending: false,
        info: { prev: null, next: null, pages: 1, current: null },
      });
    });
    builder.addCase(fetchItemById.pending, (state) => {
      state.modal.isPending = true;
      state.modal.error = '';
      state.modal.item = null;
    });
    builder.addCase(fetchItemById.fulfilled, (state, action) => {
      state.modal.isPending = false;
      state.modal.error = '';
      state.modal.item = action.payload.item;
    });
    builder.addCase(fetchItemById.rejected, (state, action) => {
      state.modal.isPending = false;
      state.modal.error = action.payload?.error;
      state.modal.item = null;
    });
  },
});

const apiReducer = apiSlice.reducer;
const apiAction = apiSlice.actions;

export { apiReducer, apiAction, fetchItems, fetchItemById };
