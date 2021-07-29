export const avatarImageTmpl = `
  {{#if avatarImageURL}}
    <img class="avatar-image" href="{{avatarImageURL}}"/>
  {{else}}
    <span class="material-icons center-self-align default-avatar-icon"> 
      account_box 
    </span>
  {{/if}}
`;
