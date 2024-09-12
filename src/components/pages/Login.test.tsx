// Login.test.tsx
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from './Login';
import { UserProvider } from '../../context/UserContext';
import { HelmetProvider } from 'react-helmet-async';

const mockAxios = new MockAdapter(axios);

describe('Login Component', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem'); // Mock the localStorage setItem method
    jest.spyOn(console, 'error').mockImplementation(() => {});  // Suppress console.error in tests
    mockAxios.reset();
  });
  
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid interference between tests
    jest.restoreAllMocks();
  });

  it('renders login form with email and password fields', () => {
    render(
      <HelmetProvider>
        <Router>
          <UserProvider>
            <Login />
          </UserProvider>
        </Router>
      </HelmetProvider>
    );

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /me connecter/i })).toBeInTheDocument();
  });

  it('shows an error if fields are empty on submit', async () => {
    render(
      <HelmetProvider>
        <Router>
          <UserProvider>
            <Login />
          </UserProvider>
        </Router>
      </HelmetProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /me connecter/i }));

    expect(await screen.findByText('Veuillez remplir tous les champs')).toBeInTheDocument();
  });

  it('sends a login request and redirects on success', async () => {
    // Mock successful login

    // ${import.meta.env.VITE_API_URL}
    // http://localhost:3000
    // ${process.env.VITE_API_URL}
    mockAxios.onPost(`${process.env.VITE_API_URL}/login`).reply(200, {
      token: 'valid_jwt_token',
    });

    render(
      <HelmetProvider>
        <Router>
          <UserProvider>
            <Login />
          </UserProvider>
        </Router>
      </HelmetProvider>
    );

    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /me connecter/i }));

    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith('token', 'valid_jwt_token'));
    // Here you can also test navigation if needed
  });

  it('displays an error message if login fails', async () => {
    // Mock failed login

    // ${import.meta.env.VITE_API_URL}
    // http://localhost:3000
    // ${process.env.VITE_API_URL}
    mockAxios.onPost(`${process.env.VITE_API_URL}/login`).reply(401, {
      message: "Nom d'utilisateur ou mot de passe non reconnu",
    });

    render(
      <HelmetProvider>
        <Router>
          <UserProvider>
            <Login />
          </UserProvider>
        </Router>
      </HelmetProvider>
    );

    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'erreur@email.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'User1234' } });

    fireEvent.click(screen.getByRole('button', { name: /me connecter/i }));

    expect(await screen.findByText(/nom d'utilisateur ou mot de passe non reconnu/i)).toBeInTheDocument();
  });

  // it('displays a success toast when a user is redirected with a state toast', async () => {
  //   jest.mock('react-toastify', () => ({
  //     toast: {
  //       success: jest.fn(),
  //       error: jest.fn(),
  //     }
  //   }));
  //   render(
  //     <HelmetProvider>
  //       <Router>
  //         <UserProvider>
  //           <Login />
  //         </UserProvider>
  //       </Router>
  //     </HelmetProvider>
  //   );

  //   // Simulating redirection with toast
  //   fireEvent.click(screen.getByRole('button', { name: /me connecter/i }));

  //   expect(require('react-toastify').toast.success).toHaveBeenCalledWith('Compte créé avec succès');
  // });
});