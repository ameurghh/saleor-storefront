import * as React from "react";
import { Query } from "react-apollo";

import { Button, Form, SelectField, TextField } from "..";
import { FormError } from "../Form";
import { GET_COUNTRIES_LIST } from "./queries";

import "./scss/index.scss";

const ShippingAddressForm: React.SFC<{
  buttonText: string;
  errors: FormError[];
  loading: boolean;
  onSubmit(event: any, data: any): void;
}> = ({ buttonText, errors, loading, onSubmit }) => (
  <Query query={GET_COUNTRIES_LIST}>
    {({ data: { shop } }) => {
      if (shop) {
        return (
          <div className="address-form">
            <Form errors={errors} onSubmit={onSubmit}>
              <TextField
                label="Email Address"
                type="email"
                autoComplete="email"
                name="email"
              />
              <div className="address-form__grid">
                <TextField
                  label="First Name"
                  type="given-name"
                  name="firstName"
                  autoComplete="given-name"
                />
                <TextField
                  label="Last Name"
                  type="family-name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </div>
              <TextField
                label="Company"
                type="organization"
                name="companyName"
                autoComplete="organization"
              />
              <TextField
                label="Street Line 1"
                type="address-line1"
                name="streetAddress1"
                autoComplete="address-line1"
              />
              <TextField
                label="Street Line 2"
                type="address-line2"
                name="streetAddress2"
                autoComplete="address-line2"
              />
              <div className="address-form__grid">
                <TextField
                  label="City"
                  type="city"
                  name="city"
                  autoComplete="city"
                />
                <TextField
                  label="State/Province"
                  type="state"
                  name="countryArea"
                  autoComplete="state"
                />
              </div>
              <div className="address-form__grid">
                <TextField
                  label="Zip-Code"
                  type="postal-code"
                  name="postalCode"
                  autoComplete="postal-code"
                />
                <SelectField
                  label="Country"
                  name="country"
                  autoComplete="country-name"
                  options={shop.countries.map(country => ({
                    label: country.country,
                    value: country.code
                  }))}
                />
              </div>
              <TextField
                label="Phone number"
                type="tel"
                name="phone"
                autoComplete="phone-number"
              />
              <label className="checkbox">
                <input type="checkbox" />
                <span>Use as Billing Address</span>
              </label>
              <Button disabled={loading}>
                {loading ? "Loading" : buttonText}
              </Button>
            </Form>
          </div>
        );
      } else {
        return null;
      }
    }}
  </Query>
);

export default ShippingAddressForm;