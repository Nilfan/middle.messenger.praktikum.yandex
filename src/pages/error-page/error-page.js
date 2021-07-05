import {
  errorPageTemplate
} from './error-page.tmpl';
import Handlebars from "handlebars";

export class ErrorPage {

  constructor() {
    this.template = Handlebars.compile(errorPageTemplate)
  }

  compile({
    code,
    text,
    buttonText = 'Назад к чатам'
  }) {
    return this.template({
      code,
      text,
      buttonText
    })
  }
}