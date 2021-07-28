import Block, { CustomElementEvents } from "../classes/block";

export interface Props {
  children?: { [key: string]: Block };
  events?: CustomElementEvents | { [key: string]: CustomElementEvents };
  formsFields?: string[];
}
