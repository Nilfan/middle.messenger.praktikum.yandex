export const loginPageTemplate = `
  <main class="modal-block login-block">
    <form class="column-vertical-align" id="loginForm">
      <h2 class="title"> Вход </h2>
      <LoginInput> </LoginInput>
      <PasswordInput> </PasswordInput>
      <div class="controls"> 
        <SubmitButton> </SubmitButton>
        <a class="link" href="/signup"> Нет аккаунта? </a>
      </div>
    </form>

    <LogoutButton> </LogoutButton>
  </main>
`;
