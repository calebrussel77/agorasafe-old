import {AppProviders} from '@app-providers/app-providers';
import {RenderOptions, render} from '@testing-library/react';
import {ReactElement} from 'react';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, {wrapper: AppProviders, ...options});

export * from '@testing-library/react';

export {customRender as render};
