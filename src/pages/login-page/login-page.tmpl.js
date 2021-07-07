export const loginPageTemplate = `
  <div class="center-layout">
    <main class="modal-block login-block">
      <form class="column-vertical-align">
        <h2 class="title"> Вход </h2>
        <div class="form-field">
          <input class="text-input invalid" name="login" placeholder="Логин"/>
          <span class="error-text"> Неверный логин или пароль<span>
        </div>
        <div class="form-field">
          <input class="text-input invalid" name="password" placeholder="Пароль"/>
        </div>
        <div class="controls"> 
          <button class="btn btn-ok"> Авторизоваться </button>
          <a class="link" href="/signin"> Нет аккаунта? </a>
        </div>
      </form>
    </main>
  </div>
`