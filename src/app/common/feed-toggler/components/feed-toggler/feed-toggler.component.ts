import {userLoggedInSelector} from 'src/app/auth/store/selectors'
import {Observable} from 'rxjs'
import {Component, Input, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'

@Component({
  selector: 'sm-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss'],
})
export class FeedTogglerComponent implements OnInit {
  @Input('tag') tagName: string | null
  isLoggedIn$: Observable<boolean>

  initializeValues() {
    this.isLoggedIn$ = this.store.pipe(select(userLoggedInSelector))
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }
}
