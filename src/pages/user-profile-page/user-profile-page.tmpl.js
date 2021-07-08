export const userProfilePageTmpl = `
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
      <div>
        {{{table}}}
      </div>
    </main>
  </div>
`