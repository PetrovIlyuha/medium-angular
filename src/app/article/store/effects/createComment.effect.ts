import {
  createCommentSuccessAction,
  createCommentFailureAction,
} from './../actions/createComment.actions'
import {CreateCommentInterface} from './../../types/createComment.interface'
import {SingleArticleService} from './../../services/article.service'
import {Injectable} from '@angular/core'

import {createEffect, Actions, ofType} from '@ngrx/effects'
import {catchError, map, switchMap, tap} from 'rxjs/operators'
import {of} from 'rxjs'
import {createCommentAction} from '../actions/createComment.actions'

@Injectable()
export class CreateCommentEffect {
  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCommentAction),
      switchMap(({text, slug}: CreateCommentInterface) => {
        return this.articleService.createComment(text, slug).pipe(
          map(() => {
            return createCommentSuccessAction()
          }),
          catchError(() => {
            return of(createCommentFailureAction())
          }),
        )
      }),
    ),
  )

  reloadAfterCreateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCommentSuccessAction),
        tap(() => {
          setTimeout(() => {
            window.location.reload()
          }, 200)
        }),
      ),
    {dispatch: false},
  )

  constructor(
    private actions$: Actions,
    private articleService: SingleArticleService,
  ) {}
}
