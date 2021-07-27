export const errorPageTemplate = `
    <div class="column-vertical-align modal-block error-block ">
      <h1 class="error-code"> {{ code }} </h1>
      <span class="error-text"> {{ text }} </span>
      <a class="link" href="/"> {{ buttonText }} </a>
    </div>
`;
