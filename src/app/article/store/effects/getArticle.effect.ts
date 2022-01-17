import {SingleArticleService} from './../../services/article.service'
import {ArticleInterface} from './../../../shared/types/article.interface'
import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction,
} from './../actions/article.actions'
import {Injectable} from '@angular/core'

import {createEffect, Actions, ofType} from '@ngrx/effects'
import {catchError, map, switchMap} from 'rxjs/operators'
import {of} from 'rxjs'

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}) => {
        return this.articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({article})
          }),
          catchError(() => {
            return of(getArticleFailureAction())
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
