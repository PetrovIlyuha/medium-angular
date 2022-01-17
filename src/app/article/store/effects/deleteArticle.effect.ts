import {SingleArticleService} from './../../services/article.service'
import {Injectable} from '@angular/core'

import {createEffect, Actions, ofType} from '@ngrx/effects'
import {catchError, map, switchMap, tap} from 'rxjs/operators'
import {of} from 'rxjs'
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction,
} from '../actions/delete-article.actions'
import {Router} from '@angular/router'

@Injectable()
export class DeleteArticleEffect {
  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticleAction),
      switchMap(({slug}) => {
        return this.articleService.deleteArticle(slug).pipe(
          map(() => {
            return deleteArticleSuccessAction()
          }),
          catchError(() => {
            return of(deleteArticleFailureAction())
          }),
        )
      }),
    ),
  )

  redirectAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteArticleSuccessAction),
        tap(() => {
          this.router.navigate(['/'])
        }),
      ),
    {dispatch: false},
  )

  constructor(
    private actions$: Actions,
    private router: Router,
    private articleService: SingleArticleService,
  ) {}
}
