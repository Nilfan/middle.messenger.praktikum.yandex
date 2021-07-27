export const chatsListItemTmpl = `
      <AvatarImage></AvatarImage>
      <div class="conversation-content"> 
        <div class="conversation-header"> 
          <div class="conversation-title"> {{this.title}} </div>
          <div class="last-message-time"> {{numToTime this.date}} </div> 
        </div>
        <div class="conversation-text"> {{this.text}} </div>
      </div>
`;
