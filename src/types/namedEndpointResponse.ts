type NamedEndpointResponse<T> = {
  count: number;
  next: string | number | null;
  previous: string | number | null;
  results: T[];
};

export default NamedEndpointResponse;
