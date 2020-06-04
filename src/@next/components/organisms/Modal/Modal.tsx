import React from "react";

import { CardHeader, FormFooter } from "@components/molecules";
import { Overlay } from "@components/organisms";

import * as S from "./styles";
import { IProps } from "./types";

const getCancelBtnProps = (action: () => void, text?: string) =>
  text && {
    cancelBtn: {
      action,
      testingContext: 'cancelButton',
      text,
    },
  };

const getSubmitBtnProps = (text: string, submitButtontestingContext: string, action?: () => void) => ({
  submitBtn: action
    ? {
        action,
        testingContext: submitButtontestingContext,
        text,
      }
    : { testingContext: submitButtontestingContext, text },
});

export const Modal: React.FC<IProps> = ({
  cancelBtnText,
  children,
  disabled,
  hide,
  formId = "modal-submit",
  onSubmit,
  submitBtnText,
  submitButtontestingContext,
  show,
  target,
  title,
}: IProps) => {
  return (
    <Overlay position="center" show={show} hide={hide} target={target}>
      <S.Modal>
        <CardHeader divider onHide={hide}>
          {title}
        </CardHeader>
        <S.Content>{children}</S.Content>
        <FormFooter
          divider
          disabled={disabled}
          {...getSubmitBtnProps(submitBtnText, submitButtontestingContext, onSubmit)}
          {...getCancelBtnProps(hide, cancelBtnText)}
          formId={formId}
        />
      </S.Modal>
    </Overlay>
  );
};
