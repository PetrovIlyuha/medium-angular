import {createAction, props} from '@ngrx/store'
import {GetArticleFavoritedStatus} from '../../types/actionTypes'

export const getArticleFavoritedStatusAction = createAction(
  GetArticleFavoritedStatus.GET_ARTICLE_FAV_STATUS,
  props<{slug: string}>(),
)

export const getArticleFavoritedStatusSuccessAction = createAction(
  GetArticleFavoritedStatus.GET_ARTICLE_FAV_STATUS_SUCCESS,
  props<{isFavorited: boolean}>(),
)

export const getArticleFavoritedStatusFailureAction = createAction(
  GetArticleFavoritedStatus.GET_ARTICLE_FAV_STATUS_FAILURE,
)
