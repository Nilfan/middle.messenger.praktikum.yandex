export const chatsListItemTmpl = `
<AvatarImage></AvatarImage>
<div class="conversation-content"> 
  <div class="conversation-header"> 
    <div class="conversation-title">
      {{this.title}} 
    </div>
    <div class="last-message-time">
      {{numToTime this.last_message.time}} 
    </div> 
  </div>
  <div class="conversation-text"> 
    {{this.last_message.content}} 
  </div>
</div>
`;
