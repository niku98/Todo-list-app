import axios, { Axios, type AxiosRequestConfig, type AxiosResponse } from "axios";

interface ApiInputFunc<D, P extends any[]> {
  (api: Axios, ...params: P): Promise<AxiosResponse<D>>;
}

type CreateApiInput = {
  [key: string]: ApiInputFunc<any, any>;
};

type CreateApiOutput<Input, Keys extends keyof Input = keyof Input> = {
  [P in Keys]: Input[P] extends ApiInputFunc<infer D, infer P>
    ? (...params: P) => Promise<AxiosResponse<D>>
    : any;
};

export function createApi<Input extends CreateApiInput>(
  config: AxiosRequestConfig,
  input: Input
): CreateApiOutput<Input> {
  const api = axios.create(config);
  const keys = Object.keys(input);

  return keys.reduce<CreateApiOutput<Input>>((result, key) => {
    const resourceCreator = input[key];
    result[key as keyof Input] = ((...params: any[]) => {
      return resourceCreator(api, ...params);
    }) as CreateApiOutput<Input>[keyof Input];

    return result;
  }, {} as any);
}
