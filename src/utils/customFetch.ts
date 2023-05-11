interface Props {
  url: string;
  options?: {
    method: 'GET';
  };
}

type CustomFetch = <T>({ url, options }: Props) => Promise<T>;

const customFetch: CustomFetch = ({ url, options }) =>
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => ({ error: 'Something went wrong\nTry later' }));

export { customFetch };
