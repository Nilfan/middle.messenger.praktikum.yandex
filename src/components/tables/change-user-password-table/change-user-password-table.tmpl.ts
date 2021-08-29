export const changeUserPasswordTableTmpl = `
<div class="form-field file-input"> 
  <label class="form-field-label" for="update-avatar"> Изменить аватарку </label>
  <input type="file" name="update-avatar" id="update-avatar" />
</div>
<form id="changePasswordForm">
  <div class="two-column-grid change-user-profile-table">
      {{#each rows}}
        <div class="grid-raw">
          <div class="raw-key"> 
            <{{this}}> </{{this}}>
          </div>
          <div class="raw-value"> </div>
        </div>
      {{/each}}
  </div>
  <div class="controls-table">
       <button class="btn btn-ok" type="submit"> Сохранить пароль </button>
    </div>
  </div>
</form>
`;
