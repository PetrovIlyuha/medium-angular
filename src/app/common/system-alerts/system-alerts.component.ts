import {Component, Input, OnInit} from '@angular/core'
import {Router} from '@angular/router'

@Component({
  selector: 'sm-system-alerts',
  templateUrl: './system-alerts.component.html',
  styleUrls: ['./system-alerts.component.scss'],
})
export class SystemAlertsComponent implements OnInit {
  @Input() alertTrigger: boolean
  @Input() message: string = ''
  constructor(private router: Router) {}

  redirectToSpecifiedPage(): void {
    if (this.message.includes('Registration')) {
      setTimeout(() => {
        this.router.navigateByUrl('/login')
      }, 300)
    } else if (this.message.includes('logged')) {
      setTimeout(() => {
        this.router.navigateByUrl('/')
      }, 300)
    }
    this.message = ''
  }

  ngOnInit(): void {}
}
