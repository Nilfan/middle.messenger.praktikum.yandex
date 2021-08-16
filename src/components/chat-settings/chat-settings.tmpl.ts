export const chatSettingsTmpl = `
  {{#if chatChosen}}
    <form id="searchUsersForm"> 
      <SearchUsers> </SearchUsers>  
    </form>
    <UsersList> </UsersList>
  {{else}}
    <Banner> </Banner>
  {{/if}}

`;
