export const messengerTmpl = `
  <div class="left-side">
    <div class="chats-table-header">
      <a class="link fill-container" href="/user-profile"> 
        <span> Мой профиль </span>
        <span class="material-icons person-icon"> person_pin </span>
      </a>
      <form class="search-chat-form"> 
        <SearchChatInput> </SearchChatInput>
        <button type="submit" class="material-icons icon-button"> search </button>
      </form>
    </div>
    
    <ChatsList> </ChatsList> 
  </div>

  <div class="right-side">
    <navbar class="current-chat-header">
      <ActiveChatAvatarImage> </ActiveChatAvatarImage>
      <span class="chat-title"> {{activeChatTitle}} </span>
      <button class="material-icons icon-button settings-button"> settings </button>
    </navbar>
    <div class="messages-container">  
      <MessageTable></MessageTable>
    </div>
    <div class="new-message-controls">
      <form class="search-chat-form"> 
        <button class="material-icons icon-button settings-button"> attach_file </button>
        <NewMessageInput> </NewMessageInput>
        <button type="submit" class="material-icons icon-button"> send </button>
      </form>
    </div>

  </div>

`;
