import {FavoritesModule} from './common/favorites/favorites.module'
import {SettingsModule} from './settings/settings.module'
import {EditArticleModule} from './edit-article/edit-article.module'
import {CreateArticleModule} from './create-article/create-article.module'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppRoutingModule} from './app-routing.module'

import {TagFeedModule} from './tagFeed/tagfeed.module'
import {SubscriptionFeedModule} from './subscription-feed/subscription-feed.module'
import {AuthInterceptor} from './shared/services/authInterceptor.service'
import {PersistanceService} from './shared/services/persistance.service'
import {NavBarModule} from './common/navbar/NavBar.module'
import {EffectsModule} from '@ngrx/effects'
import {environment} from './../environments/environment'
import {FeedModule} from './feed/feed.module'
import {SingleArticleModule} from './article/single-article.module'

import {AuthModule} from './auth/auth.module'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import {AppComponent} from 'src/app/app.component'
import {StoreModule} from '@ngrx/store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavBarModule,
    AuthModule,
    FeedModule,
    TagFeedModule,
    SingleArticleModule,
    SubscriptionFeedModule,
    CreateArticleModule,
    EditArticleModule,
    SettingsModule,
    FavoritesModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({router: routerReducer}),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
