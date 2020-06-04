import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Icon, IconButton } from "@components/atoms";
import { CachedImage, TextField } from "@components/molecules";

import { generateProductUrl } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

const QuantityButtons = (
  add: () => void,
  substract: () => void,
  index?: number
) => (
  <S.QuantityButtons>
    <div
      onClick={substract}
      data-test={`cartPageItemQuantityBtnSubtract`}
    >
      <Icon size={16} name="horizontal_line" />
    </div>
    <div onClick={add} data-test={`cartPageItemQuantityBtnAdd`}>
      <Icon size={16} name="plus" />
    </div>
  </S.QuantityButtons>
);

/**
 * Product row displayed on cart page
 */
export const CartRow: React.FC<IProps> = ({
  index,
  totalPrice,
  unitPrice,
  name,
  sku,
  quantity,
  maxQuantity,
  onQuantityChange,
  thumbnail,
  attributes = [],
  onRemove,
  id,
}: IProps) => {
  const [tempQuantity, setTempQuantity] = useState<string>(quantity.toString());
  const [isTooMuch, setIsTooMuch] = useState(false);

  const handleBlurQuantityInput = () => {
    let newQuantity = parseInt(tempQuantity, 10);

    if (isNaN(newQuantity) || newQuantity <= 0) {
      newQuantity = quantity;
    } else if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }

    if (quantity !== newQuantity) {
      onQuantityChange(newQuantity);
    }

    const newTempQuantity = newQuantity.toString();
    if (tempQuantity !== newTempQuantity) {
      setTempQuantity(newTempQuantity);
    }

    setIsTooMuch(false);
  };

  useEffect(() => {
    setTempQuantity(quantity.toString());
  }, [quantity]);

  const add = React.useCallback(
    () => quantity < maxQuantity && onQuantityChange(quantity + 1),
    [quantity]
  );
  const substract = React.useCallback(
    () => quantity > 1 && onQuantityChange(quantity - 1),
    [quantity]
  );
  const handleQuantityChange = (evt: React.ChangeEvent<any>) => {
    const newQuantity = parseInt(evt.target.value, 10);

    setTempQuantity(evt.target.value);

    setIsTooMuch(!isNaN(newQuantity) && newQuantity > maxQuantity);
  };

  const quantityErrors = isTooMuch
    ? [
        {
          message: `Maximum quantity is ${maxQuantity}`,
        },
      ]
    : undefined;

  const productUrl = generateProductUrl(id, name);

  return (
    <S.Wrapper data-test="cartRow" data-testId={sku}>
      <S.Photo>
        <Link to={productUrl}>
          <CachedImage data-test={`cartPageItemImage`} {...thumbnail} />
        </Link>
      </S.Photo>
      <S.Description>
        <Link to={productUrl}>
          <S.Name data-test={`cartPageItemName`}>{name}</S.Name>
        </Link>
        <S.Sku>
          <S.LightFont>
            SKU:{" "}
            <span data-test={`cartPageItemSKU`}>{sku ? sku : "-"}</span>
          </S.LightFont>
        </S.Sku>
        <S.Attributes data-test={`cartPageItemAttributes`}>
          {attributes.map(({ attribute, values }, attributeIndex) => (
            <S.SingleAttribute key={attribute.id}>
              <span
                data-test={`cartPageItemSingleAttribute`} data-testId={attributeIndex}
              >
                <S.LightFont>{attribute.name}:</S.LightFont>{" "}
                {values.map(value => value.name).join(", ")}
              </span>
            </S.SingleAttribute>
          ))}
        </S.Attributes>
      </S.Description>
      <S.Quantity>
        <TextField
          data-test={`cartPageItemQuantityInput`}
          name="quantity"
          label="Quantity"
          value={tempQuantity}
          onBlur={handleBlurQuantityInput}
          onChange={handleQuantityChange}
          contentRight={QuantityButtons(add, substract, index)}
          errors={quantityErrors}
        />
      </S.Quantity>
      <S.Trash>
        <IconButton
          data-test={`cartPageItemBtnRemove`}
          size={22}
          name="trash"
          onClick={onRemove}
        />
      </S.Trash>

      <S.TotalPrice>
        <S.PriceLabel>
          <S.LightFont>Total Price:</S.LightFont>
        </S.PriceLabel>
        <p data-test="totalPrice">{totalPrice}</p>
      </S.TotalPrice>
      <S.UnitPrice>
        <S.PriceLabel>
          <S.LightFont>Price:</S.LightFont>
        </S.PriceLabel>
        <p data-test="unitPrice">{unitPrice}</p>
      </S.UnitPrice>
    </S.Wrapper>
  );
};
