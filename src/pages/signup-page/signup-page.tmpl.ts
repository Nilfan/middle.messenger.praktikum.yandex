export const signupPageTmpl = `
  <main class="modal-block signup-block">
    <form class="column-vertical-align" id="signupForm">
      <h2 class="title"> Регистрация </h2>
      <EmailInput> </EmailInput>
      <LoginInput> </LoginInput>
      <FirstNameInput> </FirstNameInput>
      <LastNameInput> </LastNameInput>
      <PhoneInput> </PhoneInput>
      <PasswordInput> </PasswordInput>
      <PasswordVerificationInput> </PasswordVerificationInput>
      <div class="controls"> 
        <SubmitButton> </SubmitButton>
        <a class="link" href="/login"> Войти </a>
      </div>
    </form>
  </main>
`;
