import {Injectable} from '@angular/core'

@Injectable()
export class PersistanceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error(`Error saving to local storage: ${error}`)
    }
  }
  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (error) {
      console.error(`Error getting data from localstorage: ${error}`)
      return null
    }
  }
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Removal of token from localstorage failed with: ${error}`)
    }
  }
}
