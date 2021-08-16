export const formFieldTmpl = `
    <label class="form-field-label" for="{{name}}">
      {{label}}
    </label>
    <input 
        class="{{joinClassNames classNames}} {{#if errorText}} invalid {{/if}}" 
        name="{{name}}" 
        id="{{name}}" 
        placeholder="{{placeholder}}" 
        {{#if_eq type "file"}}accept="image/*"{{/if_eq}}
        type="{{#if type}}{{type}}{{else}}text{{/if}}"
        value="{{value}}"
        autocomplete="off"
    />
    <span class="error-text"> 
      {{errorText}}
    <span>
`;
