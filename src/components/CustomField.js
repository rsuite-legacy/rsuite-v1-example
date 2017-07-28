import React from 'react';
import {
  FormGroup,
  ControlLabel,
  HelpBlock
} from 'rsuite';
import { Field } from 'form-lib';

export const CustomField = ({ name, label, accepter, error, ...props }) => (
  <FormGroup className={error ? 'has-error' : ''}>
    <ControlLabel>{label} </ControlLabel>
    <Field name={name} accepter={accepter} {...props} />
    <HelpBlock className={error ? 'error' : ''}>{error}</HelpBlock>
  </FormGroup>
);

