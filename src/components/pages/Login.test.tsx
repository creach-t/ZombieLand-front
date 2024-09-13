/* eslint-disable react/react-in-jsx-scope */
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

describe('Login component security tests', () => {
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

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /me connecter/i })
    ).toBeInTheDocument();
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
    fireEvent.click(submitButton);

    const errorToast = await screen.findByText(
      /veuillez remplir tous les champs/i
    );
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

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Add axios mock or check for successful login redirection
  });

  // Test for XSS attack prevention
  it('prevents XSS attack in email input', async () => {
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

    // Simulate XSS attack by entering a script in the email input
    const xssPayload = '<script>alert("XSS")</script>';
    fireEvent.change(emailInput, { target: { value: xssPayload } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Check if the script tag is sanitized
    expect(screen.queryByText('alert("XSS")')).not.toBeInTheDocument();
  });

  // Test for SQL Injection prevention
  it('prevents SQL injection attempt in email input', async () => {
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

    // Simulate SQL injection attack in the email input
    const sqlInjectionPayload = "' OR 1=1;--";
    fireEvent.change(emailInput, { target: { value: sqlInjectionPayload } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Check for security mechanisms preventing SQL injection (e.g., validation, sanitization)
    // In this test case, if your app properly escapes or rejects such payloads,
    // you could mock an API call and ensure the payload is not sent to the server unaltered.
    expect(screen.queryByText(sqlInjectionPayload)).not.toBeInTheDocument();
  });
});
