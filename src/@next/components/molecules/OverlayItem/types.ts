export interface IProps {
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  testingContextId?: string;
  onClick?: () => void;
}
