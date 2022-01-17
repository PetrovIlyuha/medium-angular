import {CreateCommentInterface} from './../../types/createComment.interface'
import {CreateCommentTypes} from './../../types/actionTypes'
import {createAction, props} from '@ngrx/store'

export const createCommentAction = createAction(
  CreateCommentTypes.CREATE_COMMENT,
  props<CreateCommentInterface>(),
)

export const createCommentSuccessAction = createAction(
  CreateCommentTypes.CREATE_COMMENT_SUCCESS,
)

export const createCommentFailureAction = createAction(
  CreateCommentTypes.CREATE_COMMENT_FAILURE,
)
