import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('6. Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const {
      averageWeight: { value, measurementUnit }, name, type, image } = pokemonList[0];

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage.src).toBe(image);
    expect(pokemonImage.alt).toBe(`${name} sprite`);
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByText(/More Details/i);
    expect(linkDetails).toBeInTheDocument();
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByText(/More Details/i);
    userEvent.click(linkDetails);

    const { location: { pathname } } = history;
    const { id } = pokemonList[0];

    expect(pathname).toBe(`/pokemon/${id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name } = pokemonList[0];
    act(() => history.push(`/pokemon/${id}`));

    const favoriteBox = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriteBox);

    act(() => history.push('/'));

    const pokemonImages = screen.getAllByRole('img');
    expect(pokemonImages[1].src).toBe('http://localhost/star-icon.svg');
    expect(pokemonImages[1].alt).toBe(`${name} is marked as favorite`);
  });
});
