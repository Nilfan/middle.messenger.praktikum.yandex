export const messengerTmpl = `
  <div class="left-side">
    <div class="chats-table-header">
      <a class="link fill-container" href="/user-profile"> 
        <span> Мой профиль </span>
        <span class="material-icons person-icon"> person_pin </span>
      </a>
      <form class="search-chat-form" id="addChatForm"> 
        <AddChatInput> </AddChatInput>
        <button type="submit" class="material-icons icon-button"> add </button>
      </form>
    </div>
    <ChatsList> </ChatsList> 
  </div>
  <div class="right-side">
    <MessengerHeader> </MessengerHeader>
    <div class="messages-container"> 
      <MessageTable></MessageTable>
      <ChatSettings></ChatSettings>
    </div>
    <div class="new-message-controls">
      <form class="search-chat-form" id="sendMessageForm"> 
        <button class="material-icons icon-button settings-button"> attach_file </button>
        <NewMessageInput> </NewMessageInput>
        <button type="submit" class="material-icons icon-button"> send </button>
      </form>
    </div>
  </div>
`;
