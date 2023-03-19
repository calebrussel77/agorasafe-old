import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { LoginForm } from './login-form';

let emailInput: HTMLElement;
let passwordInput: HTMLElement;
let submitButton: HTMLElement;
const invalidEmail = 'ddfdfdf@dd';
const invalidPassword = 'jane';

jest.mock('next/router', () => require('next-router-mock'));

describe('Login form component', () => {
  beforeEach(() => {
    render(<LoginForm />);
    emailInput = screen.getByRole('textbox', {
      name: /adresse email/i,
    });
    passwordInput = screen.getByLabelText(/mot de passe/i);
    submitButton = screen.getByRole('button', { name: /connexion/i });
  });

  it('should render on the screen', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Should display values on each inputs', async () => {
    userEvent.setup();
    await userEvent.type(emailInput, invalidEmail);
    await userEvent.type(passwordInput, invalidPassword);
    await userEvent.click(submitButton);
    expect(emailInput).toHaveValue(invalidEmail);
    expect(passwordInput).toHaveValue(invalidPassword);
  });

  describe('When inputs have values and submit button is clicked', () => {
    it('Should display error messages on the screen when the email is not valid', async () => {
      userEvent.setup();
      await userEvent.type(emailInput, invalidEmail);
      await userEvent.type(passwordInput, invalidPassword);
      await userEvent.click(submitButton);
      expect(
        screen.getByRole('alert', { name: /Cette adresse email est invalide/i })
      ).toBeInTheDocument();
    });
  });
});
