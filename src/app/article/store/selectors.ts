import {ArticleStateInterface} from './../types/articleState.interface'
import {createFeatureSelector, createSelector} from '@ngrx/store'
import {CreateCommentState} from '../types/createCommentState.interface'
import {GetFavStatusState} from '../types/GetFavStatusState.interface'

export const articleFeatureSelector =
  createFeatureSelector<ArticleStateInterface>('article')

export const isLoadingArticleSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.isLoading,
)

export const articleSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.data,
)

export const commentFeatureSelector =
  createFeatureSelector<CreateCommentState>('comment')

export const commentCreatedSelector = createSelector(
  commentFeatureSelector,
  (commentCreateState: CreateCommentState) => commentCreateState.isCreated,
)

export const commentCreateErroredSelector = createSelector(
  commentFeatureSelector,
  (commentCreateState: CreateCommentState) => commentCreateState.error,
)

export const articleFavoriteStatusSelector =
  createFeatureSelector<GetFavStatusState>('favorite_status')

export const isArticleFavoritedSelector = createSelector(
  articleFavoriteStatusSelector,
  (favState: GetFavStatusState) => favState.isFavorited,
)
