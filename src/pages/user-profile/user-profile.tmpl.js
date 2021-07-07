export const userProfileTmpl = `
  <div class="page-content-container"> 
    <div class="center-layout back-button-column">
      <a class="link fill-container" href="/messenger"> 
        <span class="material-icons center-self-align"> &#xE2EA; </span>
      </a>
    </div>
    <main class="page-content user-info-content">
      <div class="page-title"> 
        <div class="profile-avatar">
          {{#if avatarImageURL}}
            <img class="avatar-image" href="{{avatarImageURL}}"/>
          {{else}}
             <span class="material-icons center-self-align default-avatar-icon"> account_box </span>
          {{/if}}
          </div>
      </div>
      <div class="two-column-grid user-info-table">
          {{#each raws}}
          <div class="grid-raw">
            <div class="raw-key"> {{this.key}} </div>
            <div class="raw-value"> {{this.value}} </div>
          </div>
          {{/each}}
      </div>
      <div class="two-column-grid controls-table">

        <div class="grid-raw">
          <div class="raw-key"> 
            <a class="link"> Изменить данные</a>
          </div>
          <div class="raw-value"></div>
        </div>

        <div class="grid-raw">
          <div class="raw-key"> 
            <a class="link"> Изменить пароль</a>
          </div>
          <div class="raw-value"></div>
        </div>

        <div class="grid-raw">
          <div class="raw-key"> 
            <a class="link warning-link"> Выйти </a>
          </div>
          <div class="raw-value"></div>
        </div>

      </div>

    </main>
  </div>
`