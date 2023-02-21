import { render, renderHook, screen } from '@testing-library/react';
import React, { useRef } from 'react';

import { useModalState } from '@components/lib/modal/modal';

import { SubscriptionModal } from './subscription-modal';

const onSubmit = jest.fn();
let nameInput: HTMLElement;
let emailAddress: HTMLElement;
let submitButton: HTMLElement;

describe('Email Form subscription', () => {
  const { result: dialog } = renderHook(useModalState, {});

  beforeEach(() => {
    render(<SubscriptionModal dialog={dialog.current} />);
    nameInput = screen.getByRole('textbox', {
      name: /nom/i,
    });
    emailAddress = screen.getByRole('textbox', {
      name: /adresse email/i,
    });
    submitButton = screen.getByRole('button', {
      name: /envoyer/i,
    });
  });

  describe('SubscriptionModal', () => {
    it('should be on the screen', () => {
      expect(nameInput).toBeInTheDocument();
      expect(emailAddress).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });
});
