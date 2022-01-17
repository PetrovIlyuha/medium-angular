import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigatedAction} from '@ngrx/router-store'
import {GetFavStatusState} from '../types/GetFavStatusState.interface'
import {
  getArticleFavoritedStatusAction,
  getArticleFavoritedStatusFailureAction,
  getArticleFavoritedStatusSuccessAction,
} from './actions/getFavStatus.actions'

const initialState: GetFavStatusState = {
  isLoading: false,
  isReceived: false,
  isFavorited: false,
  error: false,
}

const createCommentReducer = createReducer(
  initialState,
  on(
    getArticleFavoritedStatusAction,
    (state): GetFavStatusState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getArticleFavoritedStatusSuccessAction,
    (state, action): GetFavStatusState => ({
      ...state,
      isLoading: false,
      isReceived: true,
      isFavorited: action.isFavorited,
      error: false,
    }),
  ),
  on(
    getArticleFavoritedStatusFailureAction,
    (state): GetFavStatusState => ({
      ...state,
      isLoading: false,
      isReceived: false,
      error: true,
    }),
  ),

  on(routerNavigatedAction, (): GetFavStatusState => initialState),
)

export function articleFavoritedStatusReducer(
  state: GetFavStatusState,
  action: Action,
) {
  return createCommentReducer(state, action)
}
