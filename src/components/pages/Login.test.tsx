import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import Login from './Login';
import { UserProvider } from '../../context/UserContext';
import '@testing-library/jest-dom';

// Mock the navigate function from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: () => ({
      state: {},
    }),
  };
});

describe('Login component', () => {
  it('renders login form correctly', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <UserProvider>
            <Login />
          </UserProvider>
        </BrowserRouter>
      </HelmetProvider>
      
    );

    // Check if the email input, password input, and submit button are rendered
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /me connecter/i })).toBeInTheDocument();
  });

  it('displays error toast if email and password are missing', async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <UserProvider>
            <Login />
          </UserProvider>
        </BrowserRouter>
      </HelmetProvider>
    );

    const submitButton = screen.getByRole('button', { name: /me connecter/i });

    // Submit the form without filling inputs
    fireEvent.click(submitButton);

    // Check for error toast
    const errorToast = await screen.findByText(/veuillez remplir tous les champs/i);
    expect(errorToast).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <UserProvider>
            <Login />
          </UserProvider>
        </BrowserRouter>
      </HelmetProvider>
    );

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /me connecter/i });

    // Fill in the form inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check if the form was submitted (mock the axios request in a real case)
    // In this example, you would add logic to mock the axios request and check expected results.
  });
});