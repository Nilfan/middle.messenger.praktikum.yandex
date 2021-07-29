export const formFieldTmpl = `
    <label class="form-field-label" for="{{name}}">
      {{label}}
    </label>
    <input 
        class="text-input {{#if errorText}} invalid {{/if}}" 
        name="{{name}}" 
        id="{{name}}" 
        placeholder="{{placeholder}}" 
        type="{{#if type}}{{type}}{{else}}text{{/if}}"
        value="{{value}}"
        autocomplete="off"
    />
    <span class="error-text"> 
      {{errorText}}
    <span>
`;
