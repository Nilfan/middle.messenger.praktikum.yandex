export const loginPageTemplate = `
    <main class="modal-block login-block">
      <form class="column-vertical-align">
        <h2 class="title"> Вход </h2>
        <LoginInput></LoginInput>
        <PasswordInput></PasswordInput>
        <div class="controls"> 
          <button class="btn btn-ok" type="submit"> Авторизоваться </button>
          <a class="link" href="/signup"> Нет аккаунта? </a>
        </div>
      </form>
    </main>
`;
