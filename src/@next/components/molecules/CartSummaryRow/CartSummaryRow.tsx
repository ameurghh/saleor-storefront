import React from "react";

import { TaxedMoney } from "@components/containers";
import { CachedImage } from "../CachedImage";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Row with product to display in cart summary.
 */
const CartSummaryRow: React.FC<IProps> = ({
  index,
  sku,
  name,
  price,
  quantity,
  thumbnail,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Name data-test={`cartSummaryItem${index}Name`}>{name}</S.Name>
      <S.Sku>
        SKU: <span data-test={`cartSummaryItem${index}SKU`}>{sku}</span>
      </S.Sku>
      <S.Quantity>
        Quantity:{" "}
        <span data-test={`cartSummaryItem${index}Quantity`}>{quantity}</span>
      </S.Quantity>
      <S.Price data-test={`cartSummaryItem${index}Price`}>
        <TaxedMoney taxedMoney={price} />
      </S.Price>
      <S.Photo>
        <CachedImage data-test={`cartSummaryItem${index}Image`} {...thumbnail} />
      </S.Photo>
    </S.Wrapper>
  );
};

export { CartSummaryRow };
