import {
  createCommentAction,
  createCommentSuccessAction,
  createCommentFailureAction,
} from './actions/createComment.actions'
import {CreateCommentState} from './../types/createCommentState.interface'

import {Action, createReducer, on} from '@ngrx/store'
import {routerNavigatedAction} from '@ngrx/router-store'

const initialState: CreateCommentState = {
  isSubmitting: false,
  isCreated: false,
  error: false,
}

const createCommentReducer = createReducer(
  initialState,
  on(
    createCommentAction,
    (state): CreateCommentState => ({
      ...state,
      isSubmitting: true,
    }),
  ),
  on(
    createCommentSuccessAction,
    (state, action): CreateCommentState => ({
      ...state,
      isSubmitting: false,
      isCreated: true,
      error: false,
    }),
  ),
  on(
    createCommentFailureAction,
    (state): CreateCommentState => ({
      ...state,
      isSubmitting: false,
      isCreated: false,
      error: true,
    }),
  ),

  on(routerNavigatedAction, (): CreateCommentState => initialState),
)

export function commentCreateReducer(
  state: CreateCommentState,
  action: Action,
) {
  return createCommentReducer(state, action)
}
