export const messageTableTmpl = `
{{#if chat}}
  {{#each messages}}
    <div class="message{{#if isCurrentUserMessage}} current-user-message{{/if}}">
      <div class="message-header"> 
        {{this.userName}} 
      </div>
      <div class="message-text"> 
        {{this.content}} 
      </div>
      <div class="message-footer"> 
        {{numToTime this.time}} 
      </div>
    </div>
  {{/each}}
{{else}}
  <Banner></Banner>
{{/if}}
`;
