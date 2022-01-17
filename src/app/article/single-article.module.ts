import {ReactiveFormsModule} from '@angular/forms'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'

import {TagListModule} from './../common/tag-list/tag-list.module'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {SingleArticleService} from './services/article.service'
import {UserProfileService} from '../profile/services/userProfile.service'

import {ArticleComponent} from './components/article/article.component'

import {reducers} from './store/reducers'
import {commentCreateReducer} from './store/commentReducer'
import {articleFavoritedStatusReducer} from './store/favStatusReducer'

import {DeleteArticleEffect} from './store/effects/deleteArticle.effect'
import {GetArticleEffect} from './store/effects/getArticle.effect'
import {CreateCommentEffect} from './store/effects/createComment.effect'
import {GetArticleFavoriteStatusEffect} from './store/effects/getArticleFavoriteStatus.effect'

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule,
    TagListModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([
      GetArticleEffect,
      DeleteArticleEffect,
      CreateCommentEffect,
      GetArticleFavoriteStatusEffect,
    ]),
    StoreModule.forFeature('article', reducers),
    StoreModule.forFeature('comments', commentCreateReducer),
    StoreModule.forFeature('favorite_status', articleFavoritedStatusReducer),
  ],
  exports: [ArticleComponent],
  providers: [SingleArticleService, UserProfileService],
})
export class SingleArticleModule {}
