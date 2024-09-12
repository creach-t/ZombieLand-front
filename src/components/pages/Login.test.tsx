// Login.test.tsx
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from './Login';
import { UserProvider } from '../../context/UserContext';

const mockAxios = new MockAdapter(axios);

describe('Login Component', () => {
  const localhost = "http://localhost:3000";
  beforeEach(() => {
    mockAxios.reset();
  });

  it('renders login form with email and password fields', () => {
    render(
      <Router>
        <UserProvider>
          <Login />
        </UserProvider>
      </Router>
    );

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /me connecter/i })).toBeInTheDocument();
  });

  // it('shows an error if fields are empty on submit', async () => {
  //   render(
  //     <Router>
  //       <UserProvider>
  //         <Login />
  //       </UserProvider>
  //     </Router>
  //   );

  //   fireEvent.click(screen.getByRole('button', { name: /me connecter/i }));

  //   expect(await screen.findByText('Veuillez remplir tous les champs')).toBeInTheDocument();
  // });

  // it('sends a login request and redirects on success', async () => {
  //   // Mock successful login
  //   mockAxios.onPost(`${localhost}/login`).reply(200, {
  //     token: 'valid_jwt_token',
  //   });

  //   render(
  //     <Router>
  //       <UserProvider>
  //         <Login />
  //       </UserProvider>
  //     </Router>
  //   );

  //   fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
  //   fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });

  //   fireEvent.click(screen.getByRole('button', { name: /me connecter/i }));

  //   await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith('token', 'valid_jwt_token'));
  //   // Here you can also test navigation if needed
  // });

  // it('displays an error message if login fails', async () => {
  //   // Mock failed login
  //   mockAxios.onPost(`${localhost}/login`).reply(401, {
  //     message: "Nom d'utilisateur ou mot de passe non reconnu",
  //   });

  //   render(
  //     <Router>
  //       <UserProvider>
  //         <Login />
  //       </UserProvider>
  //     </Router>
  //   );

  //   fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
  //   fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'wrongpassword' } });

  //   fireEvent.click(screen.getByRole('button', { name: /me connecter/i }));

  //   expect(await screen.findByText(/nom d'utilisateur ou mot de passe non reconnu/i)).toBeInTheDocument();
  // });

  // it('displays a success toast when a user is redirected with a state toast', async () => {
  //   render(
  //     <Router>
  //       <UserProvider>
  //         <Login />
  //       </UserProvider>
  //     </Router>
  //   );

  //   // Simulating redirection with toast
  //   fireEvent.click(screen.getByRole('button', { name: /me connecter/i }));

  //   expect(await screen.findByText('Compte créé avec succès')).toBeInTheDocument();
  // });
});