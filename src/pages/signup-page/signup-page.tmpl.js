export const signupPageTmpl = `
  <div class="center-layout">
    <main class="modal-block signup-block">
      <form class="column-vertical-align">
        <h2 class="title"> Регистрация </h2>

        <div class="form-field">
          <label class="form-field-label" for="email">Почта</label>
          <input class="text-input" name="email" id="email" placeholder="Почта"/>
          <span class="error-text"><span>
        </div>

        <div class="form-field">
          <label class="form-field-label" for="login">Логин</label>
          <input class="text-input" name="login" id="login" placeholder="Логин"/>
          <span class="error-text"><span>
        </div>

        <div class="form-field">
          <label class="form-field-label" for="first-name">Имя</label>
          <input class="text-input" name="first-name" id="first-name" placeholder="Имя"/>
          <span class="error-text"><span>
        </div>

        <div class="form-field">
          <label class="form-field-label" for="last-name">Фамилия</label>
          <input class="text-input" name="last-name" id="last-name" placeholder="Фамилия"/>
          <span class="error-text"><span>
        </div>

        <div class="form-field">
          <label class="form-field-label" for="phone">Телефон</label>
          <input class="text-input" name="phone" id="phone" placeholder="Телефон"/>
          <span class="error-text"><span>
        </div>

        <div class="form-field">
          <label class="form-field-label" for="password">Пароль</label>
          <input class="text-input" name="password" id="password" placeholder="Пароль"/>
          <span class="error-text"><span>
        </div>
        
        <div class="form-field">
          <label class="form-field-label" for="password-verification">Пароль (ещё раз)</label>
          <input class="text-input invalid" name="password-verification" id="password-verification" placeholder="Пароль (ещё раз)"/>
          <span class="error-text"> Пароли не совпадают <span>
        </div>
        <div class="controls"> 
          <button class="btn btn-ok"> Зарегистрироваться </button>
          <a class="link" href="/login"> Войти </a>
        </div>
      </form>
    </main>
  </div>
`