import {ProfileComponent} from './profile/components/profile/profile.component'
import {CreateArticleComponent} from './create-article/components/create-article/create-article.component'
import {ArticleComponent} from './article/components/article/article.component'
import {FeedComponent} from './feed/feed.component'
import {RegisterComponent} from './auth/components/register/register.component'
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {SubscriptionFeedComponent} from './subscription-feed/subscription-feed.component'
import {TagFeedComponent} from './tagFeed/tagFeed.component'
import {EditArticleComponent} from './edit-article/components/edit-article/edit-article.component'
import {SettingsComponent} from './settings/components/settings/settings.component'

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'articles/feed', component: SubscriptionFeedComponent},
  {path: 'articles/new', component: CreateArticleComponent},
  {path: 'articles/edit/:slug', component: EditArticleComponent},
  {path: 'articles/:slug', component: ArticleComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'tags/:tag', component: TagFeedComponent},
  {path: 'profiles/:username', component: ProfileComponent},
  {path: '', component: FeedComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
