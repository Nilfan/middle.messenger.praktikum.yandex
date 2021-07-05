export const signinPageTmpl = `
  <div class="center-align">
    <main class="page-block signin-block">
      <form class="column-vertical-align">
        <h2 class="title"> Регистрация </h2>

        <div class="form-field">
          <input class="text-input" name="email" placeholder="Почта"/>
          <span class="error-text"><span>
        </div>

        <div class="form-field">
          <input class="text-input" name="login" placeholder="Логин"/>
          <span class="error-text"><span>
        </div>

        <div class="form-field">
          <input class="text-input" name="first-name" placeholder="Имя"/>
          <span class="error-text"><span>
        </div>

        <div class="form-field">
          <input class="text-input" name="last-name" placeholder="Фамилия"/>
          <span class="error-text"><span>
        </div>

        <div class="form-field">
          <input class="text-input" name="phone" placeholder="Телефон"/>
          <span class="error-text"><span>
        </div>

        <div class="form-field">
          <input class="text-input" name="password" placeholder="Пароль"/>
          <span class="error-text"><span>
        </div>
        
        <div class="form-field">
          <input class="text-input" name="password-verification" placeholder="Пароль (ещё раз)"/>
          <span class="error-text"> Пароли не совпадают <span>
        </div>
        <div class="controls"> 
          <button class="btn btn-ok"> Зарегистрироваться </button>
          <button class="btn btn-cancel"> Войти </button>
        </div>
      </form>
    </main>
  </div>
`