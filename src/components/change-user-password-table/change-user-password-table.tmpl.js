export const changeUserPasswordTableTmpl = `
  <div>
    <div class="form-field file-input"> 
      <label class="form-field-label" for="update-avatar"> Изменить аватарку </label>
      <input type="file" name="update-avatar" id="update-avatar" />
    </div>
    <div class="two-column-grid change-user-profile-table">
      {{#each rows}}
        <div class="grid-raw">
          <div class="raw-key"> 
            <div class="form-field"> 
              <label class="form-field-label" for="{{this.key}}">{{this.label}}</label>
              <input type="password" class="text-input" name="{{this.key}}" id="{{this.key}}" placeholder="{{this.label}}" value="{{this.value}}"/>
            </div>
          </div>
          <div class="raw-value"> </div>
        </div>
      {{/each}}
    </div>
    <div class="controls-table">
         <button class="btn btn-ok"> Сохранить пароль </button>
      </div>
    </div>
  </div>
`