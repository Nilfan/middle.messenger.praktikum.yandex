export const changeUserInfoTableTmpl = `
  <form>
    <ChangeAvatar> </ChangeAvatar>
  </form>
  <form id="changeUserProfileForm">
    <div class="two-column-grid change-user-profile-table">
    {{#each rows}}
      <div class="grid-raw">
        <div class="raw-key"> 
          <{{this}}> </{{this}}>
        </div>
        <div class="raw-value">
        </div>
      </div>
    {{/each}}
    </div>
    <div class="controls-table">
         <button class="btn btn-ok" type="submit"> Сохранить данные </button>
      </div>
    </div>
  </form>
`;
