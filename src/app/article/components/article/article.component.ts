import {toggleFollowUserAction} from './../../../profile/store/actions/followUserProfile.actions'
import {UserProfileInterface} from './../../../profile/types/UserProfile.interface'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {environment} from './../../../../environments/environment'
import {CurrentUserInterface} from './../../../shared/types/currentUser.interface'
import {ArticleInterface} from './../../../shared/types/article.interface'
import {
  articleSelector,
  isArticleFavoritedSelector,
} from './../../store/selectors'
import {combineLatest, Observable, Subscription} from 'rxjs'
import {ActivatedRoute, Params} from '@angular/router'
import {getArticleAction} from './../../store/actions/article.actions'
import {Component, DoCheck, OnChanges, OnDestroy, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {
  currenUserSelector,
  userLoggedInSelector,
} from '../../../auth/store/selectors'
import {map, tap, withLatestFrom} from 'rxjs/operators'
import {HttpBackend, HttpClient} from '@angular/common/http'
import {SingleArticleService} from '../../services/article.service'
import {deleteArticleAction} from '../../store/actions/delete-article.actions'
import {animate, state, style, transition, trigger} from '@angular/animations'
import {createCommentAction} from '../../store/actions/createComment.actions'
import {addToFavoritesAction} from 'src/app/common/favorites/store/actions'
import {getArticleFavoritedStatusAction} from '../../store/actions/getFavStatus.actions'
import {userProfileSelector} from 'src/app/profile/store/selectors'
import {getUserProfileAction} from 'src/app/profile/store/actions/getUserProfile.actions'

@Component({
  selector: 'sm-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [style({opacity: 0}), animate(600)]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave', animate(600, style({opacity: 0}))),
    ]),
  ],
})
export class ArticleComponent implements OnInit, OnDestroy {
  private http: HttpClient
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    httpBackend: HttpBackend,
    private articleService: SingleArticleService,
    private fb: FormBuilder,
  ) {
    this.http = new HttpClient(httpBackend)
  }
  slug: string
  article: ArticleInterface | null
  articleObservable$: Observable<ArticleInterface | null>
  articleComments$: Observable<any | null>
  slugSub$: Subscription
  articleSub$: Subscription
  isAuthor$: Observable<boolean>
  imageSub$: Subscription
  articleImageFinal: string | null
  createCommentForm: FormGroup
  createCommentformInvalid: boolean
  isLoggedIn$: Observable<boolean>
  isFavorited$: Observable<boolean>
  isFavoritedSub$: Subscription
  isFavoritedFlag: boolean
  isFollowingSub$: Subscription
  isFollowing: boolean

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesAction({
        isFavorited: this.isFavoritedFlag,
        slug: this.slug,
      }),
    )
    this.isFavoritedFlag = !this.isFavoritedFlag
  }

  get formControls(): any {
    return this.createCommentForm['controls']
  }

  get commentFormNotDirty(): any {
    return !this.createCommentForm.dirty
  }

  get commentFormNotReady(): any {
    return this.formControls.text.invalid
  }

  initializeCreateCommentForm(): void {
    this.createCommentForm = this.fb.group({
      text: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
    })
  }

  fieldInvalid(name: string): boolean {
    return (
      (this.formControls[name].invalid &&
        (this.formControls[name].dirty || this.formControls[name].touched)) ||
      this.createCommentformInvalid
    )
  }

  clearErrors(): void {
    this.createCommentformInvalid = false
  }

  createCommentSubmit(): void {
    if (!this.createCommentForm.valid) {
      this.createCommentformInvalid = true
    } else {
      this.store.dispatch(
        createCommentAction({
          text: this.createCommentForm.value,
          slug: this.article.slug,
        }),
      )
    }
  }

  getArticleReadTime(articleBody: string): number {
    return Math.round(articleBody.length / 300)
  }
  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}))
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.articleObservable$ = this.store.pipe(select(articleSelector))
    this.isFavorited$ = this.store.pipe(select(isArticleFavoritedSelector))
    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currenUserSelector)),
    ]).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null,
        ]) => {
          if (!article || !currentUser) {
            return false
          } else {
            return article.author.id === currentUser.id
          }
        },
      ),
    )
  }

  fetchArticleImage(tag: string) {
    fetch(`https://api.unsplash.com/search/photos?query=${tag}`, {
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${environment.unsplash_key}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const image = data.results[0].urls.regular
        this.articleImageFinal = image
        return image
      })
  }

  toggleFollowUser(following: boolean): void {
    this.store.dispatch(
      toggleFollowUserAction({
        username: this.article.author.username,
        following,
      }),
    )
    this.store.dispatch(
      getUserProfileAction({username: this.article.author.username}),
    )
  }

  initializeListeners() {
    this.slugSub$ = this.route.paramMap.subscribe((params: Params) => {
      this.slug = params.get('slug')
    })
    this.articleSub$ = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface) => {
        if (article) {
          this.article = article
          this.store.dispatch(
            getUserProfileAction({username: article.author.username}),
          )
        }
      })
    this.articleComments$ = this.articleService.getArticleComments(this.slug)
    this.isLoggedIn$ = this.store.pipe(select(userLoggedInSelector))
    this.isFavoritedSub$ = this.isFavorited$
      .pipe(
        withLatestFrom(
          this.store.pipe(
            select(isArticleFavoritedSelector),
            tap((isFavorited) => {
              this.isFavoritedFlag = isFavorited
            }),
          ),
        ),
      )
      .subscribe()
  }

  fetchArticle() {
    this.store.dispatch(getArticleAction({slug: this.slug}))
    this.store.dispatch(getArticleFavoritedStatusAction({slug: this.slug}))
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.initializeCreateCommentForm()
    this.fetchArticle()
    this.isFollowingSub$ = this.store
      .select(userProfileSelector)
      .subscribe((user) => {
        if (user) {
          this.isFollowing = user.following
        }
      })
    this.imageSub$ = this.articleObservable$
      .pipe(
        withLatestFrom(this.store.pipe(select(articleSelector))),
        tap((data) => {
          const article = data[0]
          if (article) {
            const articleTag = article.tagList[0]
            this.fetchArticleImage(articleTag)
          }
        }),
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.slugSub$.unsubscribe()
    this.articleSub$.unsubscribe()
  }
}
