import Handlebars from "handlebars";
import {
  errorPageTemplate
} from "../error-page/error-page.tmpl";



export class MessengerPage {

  constructor() {
    this.compiler = Handlebars.compile(errorPageTemplate);
  }

  compile() {
    const ctx = {
      code: "WIP",
      text: "Страница не готова, приходите позже",
      buttonText: 'Вернуться на страницу логина'
    }

    return this.compiler(ctx)
  }
}