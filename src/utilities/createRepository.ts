import axios, { Axios, type AxiosRequestConfig, type AxiosResponse } from "axios";

interface RepositoryInputFunc<D, P extends any[]> {
  (api: Axios, ...params: P): Promise<AxiosResponse<D>>;
}

type CreateRepositoryInput = {
  [key: string]: RepositoryInputFunc<any, any>;
};

type CreateRepositoryOutput<Input, Keys extends keyof Input = keyof Input> = {
  [P in Keys]: Input[P] extends RepositoryInputFunc<infer D, infer P>
    ? (...params: P) => Promise<AxiosResponse<D>>
    : any;
};

export function createRepository<Input extends CreateRepositoryInput>(
  config: AxiosRequestConfig,
  input: Input
): CreateRepositoryOutput<Input> {
  const api = axios.create(config);
  const keys = Object.keys(input);

  return keys.reduce<CreateRepositoryOutput<Input>>((result, key) => {
    const resourceCreator = input[key];
    result[key as keyof Input] = ((...params: any[]) => {
      return resourceCreator(api, ...params);
    }) as CreateRepositoryOutput<Input>[keyof Input];

    return result;
  }, {} as any);
}
