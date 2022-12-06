import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(linkFavorite).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(linkFavorite);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/perdemo'));
    const perdemo = screen.getByText('Page requested not found');
    expect(perdemo).toBeInTheDocument();
  });
});
