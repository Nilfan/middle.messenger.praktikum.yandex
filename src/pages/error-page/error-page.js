import {
  errorPageTemplate
} from './error-page.tmpl';
import Handlebars from "handlebars";

export class ErrorPage {

  constructor() {
    this.compiler = Handlebars.compile(errorPageTemplate)
  }

  compile({
    code,
    text,
    buttonText = 'Вернуться на страницу логина'
  }) {
    return this.compiler({
      code,
      text,
      buttonText
    })
  }
}