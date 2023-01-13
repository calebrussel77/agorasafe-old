import {render, renderHook, screen} from '@testing-library/react';
import React, {useRef} from 'react';

import {FormSubscription} from './form-subscription';

const onSubmit = jest.fn();

describe('Application', () => {
  const {result: formRef} = renderHook(useRef, {});

  beforeEach(() => {
    render(<FormSubscription onSubmit={onSubmit} formRef={formRef} />);
  });

  it('should render on the screen', () => {
    const formTitle = screen.getByRole('heading', {
      name: /enregistrement du lancement/i,
    });
    expect(formTitle).toBeInTheDocument();
    const formDescription = screen.getByText(
      /renseignez votre nom et votre addresse email pour être informé du lancement d'agorasafe\. vos donnéés ne seront en aucun cas partagés ou divulgués auprès de tierce personnes\./i
    );
    expect(formDescription).toBeInTheDocument();

    const nameInput = screen.getByRole('textbox', {
      name: /nom/i,
    });
    expect(nameInput).toBeInTheDocument();

    const emailAddress = screen.getByRole('textbox', {
      name: /adresse email/i,
    });
    expect(emailAddress).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: /envoyer/i,
    });
    expect(submitButton).toBeInTheDocument();
  });
});
