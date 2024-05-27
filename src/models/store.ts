import type { Profile } from "@/models/auth";
import type { INews } from "@/models/news";
import type { ITask } from "@/models/todo";

export interface TodoStoreModuleState {
  list: ITask[];
}

export interface NewsStoreModuleState {
  list: INews[];
}

export interface AuthStoreModuleState {
  profile?: Profile;
  isSignedIn: boolean;
}

export interface AppStoreState {
  todo: TodoStoreModuleState;
  news: NewsStoreModuleState;
  auth: AuthStoreModuleState;
}
