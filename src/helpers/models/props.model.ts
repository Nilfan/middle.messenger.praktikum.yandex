import { CustomElementEvents } from "../abstract-classes/block";
import { ObjectLiteral } from "./object-literal";

export interface Props {
  events?: CustomElementEvents | { [key: string]: CustomElementEvents };
  formsFields?: { [key: string]: string[] };
  children?: ObjectLiteral;
  classNames?: string[];
}
