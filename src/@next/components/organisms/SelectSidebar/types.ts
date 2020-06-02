import { ISelectOption } from "@types";

export interface IProps {
  title: React.ReactNode;
  options: ISelectOption[];
  selectedOptions?: string[];
  disabledOptions?: string[];
  hide: () => void;
  onSelect: (value: string) => void;
  show: boolean;
  target?: HTMLElement | null;
  footerTitle?: string;
  onClickFooter?: () => void;
  /**
   * Specific object id which will be used for writting e2e tests
   */
  testingContextId?: string;
}
