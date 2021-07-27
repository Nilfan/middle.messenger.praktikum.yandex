export type InputValidatorOptions = {
  [key: string]: string | number | null | RegExp;
};

export type CustomInputEvent = FocusEvent & { target: { [key: string]: any } };

export type Validators = {
  [key: string]: (args: any | any[] | null) => (event: CustomInputEvent) => void;
};
