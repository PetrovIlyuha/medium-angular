import {ArticleInterface} from './../../shared/types/article.interface'
import {GetArticleResponseInterface} from './../types/getArticleResponse.interface'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Injectable} from '@angular/core'
import {environment} from '../../../environments/environment'
import {map} from 'rxjs/operators'

@Injectable()
export class SingleArticleService {
  constructor(private http: HttpClient) {}
  getArticle(slug: string): Observable<ArticleInterface> {
    const fullApiUrl = `${environment.apiUrl}/articles/${slug}`
    return this.http
      .get<GetArticleResponseInterface>(fullApiUrl)
      .pipe(map((response) => response.article))
  }
  getArticleFavoritedStatus(slug: string): Observable<boolean> {
    const fullApiUrl = `${environment.apiUrl}/articles/${slug}/isFavorited`
    return this.http.get<boolean>(fullApiUrl)
  }
  getArticleComments(slug: string): Observable<any> {
    const fullApiUrl = `${environment.apiUrl}/comments/${slug}`
    return this.http
      .get<any>(fullApiUrl)
      .pipe(map((response) => response.comments))
  }
  createComment(text: string, slug: string): Observable<any> {
    const fullApiUrl = `${environment.apiUrl}/comments/${slug}`
    return this.http.post(fullApiUrl, {comment: text})
  }
  deleteArticle(slug: string): Observable<{}> {
    const fullApiUrl = `${environment.apiUrl}/articles/${slug}`
    return this.http.delete<{}>(fullApiUrl)
  }
}
