export const signupPageTmpl = `
  <main class="modal-block signup-block">
    <form class="column-vertical-align">
      <h2 class="title"> Регистрация </h2>
      <EmailInput></EmailInput>
      <LoginInput></LoginInput>
      <FirstNameInput></FirstNameInput>
      <LastNameInput></LastNameInput>
      <PhoneInput></PhoneInput>
      <PasswordInput></PasswordInput>
      <PasswordVerificationInput></PasswordVerificationInput>
      <div class="controls"> 
        <button class="btn btn-ok" type="submit"> Зарегистрироваться </button>
        <a class="link" href="/login"> Войти </a>
      </div>
    </form>
  </main>
`;
