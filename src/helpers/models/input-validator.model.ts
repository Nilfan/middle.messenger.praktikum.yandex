export type InputValidatorOptions = {
  [key: string]: string | number | null | RegExp;
};

export type CustomInputEvent = FocusEvent & { target: HTMLInputElement };

export type Validator = (element: HTMLInputElement) => boolean;

export type Validators = {
  [key: string]: (args: any | any[] | null) => (event: HTMLInputElement) => boolean;
};
