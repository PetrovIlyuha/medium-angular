import {Component, Input, OnInit} from '@angular/core'
import {BackendErrorInterface} from './../../shared/types/backendErrors.interface'

@Component({
  selector: 'sm-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorInterface
  constructor() {}

  errorMessages: string[][]

  closeErrorMessage(text: string[]): void {
    this.errorMessages = this.errorMessages.filter((m) => m !== text)
  }

  ngOnInit(): void {
    const normalizedErrors = [...Object.values(this.backendErrorsProps)].map(
      (value) => value,
    )

    this.errorMessages = normalizedErrors
  }
}
