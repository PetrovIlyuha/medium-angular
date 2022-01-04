import {getCurrentUserAction} from './auth/store/actions/getCurrentUser.actions'
import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title: string = 'SocialMixer'
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction())
  }
}
