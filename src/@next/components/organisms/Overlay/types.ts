export type Position = "center" | "left" | "right";

export interface IProps {
  children: React.ReactNode;
  duration?: number;
  hide: () => void;
  position: Position;
  show: boolean;
  target?: HTMLElement | null;
  transparent?: boolean;
  /**
   * Name which will be used for writting e2e tests
   */
  testingContext?: string;
  /**
   * Specific object id which will be used for writting e2e tests
   */
  testingContextId?: string;
}

export type TransitionState =
  | "unmounted"
  | "entering"
  | "entered"
  | "exiting"
  | "exited";
