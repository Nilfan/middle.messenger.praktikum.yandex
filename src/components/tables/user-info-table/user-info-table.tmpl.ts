export const userInfoTableTmpl = `
<div class="two-column-grid user-info-table">
  {{#each rows}}
    <div class="grid-raw">
      <div class="raw-key"> {{this.key}} </div>
      <div class="raw-value"> {{this.value}} </div>
    </div>
  {{/each}}
</div>
<div class="two-column-grid controls-table">
  <div class="grid-raw">
    <div class="raw-key"> 
      <a class="link" href="/change-user-profile"> Изменить данные</a>
    </div>
    <div class="raw-value"></div>
  </div>
  <div class="grid-raw">
    <div class="raw-key"> 
      <a class="link" href="/change-user-password"> Изменить пароль</a>
    </div>
    <div class="raw-value"></div>
  </div>
  <div class="grid-raw">
    <div class="raw-key"> 
      <LeaveButton> </LeaveButton>
    </div>
    <div class="raw-value"></div>
  </div>
</div>
`;
