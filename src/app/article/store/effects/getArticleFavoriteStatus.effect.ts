import {
  getArticleFavoritedStatusAction,
  getArticleFavoritedStatusFailureAction,
  getArticleFavoritedStatusSuccessAction,
} from './../actions/getFavStatus.actions'
import {SingleArticleService} from './../../services/article.service'
import {Injectable} from '@angular/core'

import {createEffect, Actions, ofType} from '@ngrx/effects'
import {catchError, map, switchMap} from 'rxjs/operators'
import {of} from 'rxjs'

@Injectable()
export class GetArticleFavoriteStatusEffect {
  getArticleFavoriteStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleFavoritedStatusAction),
      switchMap(({slug}) => {
        return this.articleService.getArticleFavoritedStatus(slug).pipe(
          map((isFavorited: boolean) => {
            return getArticleFavoritedStatusSuccessAction({isFavorited})
          }),
          catchError(() => {
            return of(getArticleFavoritedStatusFailureAction())
          }),
        )
      }),
    ),
  )

  constructor(
    private actions$: Actions,
    private articleService: SingleArticleService,
  ) {}
}
