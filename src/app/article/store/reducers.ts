import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction,
} from './actions/article.actions'
import {ArticleStateInterface} from './../types/articleState.interface'

import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigatedAction} from '@ngrx/router-store'

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}

const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getArticleSuccessAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article,
    }),
  ),
  on(
    getArticleFailureAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),

  on(routerNavigatedAction, (): ArticleStateInterface => initialState),
)

export function reducers(state: ArticleStateInterface, action: Action) {
  return articleReducer(state, action)
}
