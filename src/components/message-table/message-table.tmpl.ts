export const messageTableTmpl = `
  {{#each messages}}
    <div class="message{{#if currentUserMessage}} current-user-message{{/if}}">
      <div class="message-header"> {{this.username}} </div>
      <div class="message-text"> {{this.text}} </div>
      <div class="message-footer"> {{numToTime this.date}} </div>
    </div>
  {{/each}}
`;
