import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('5. Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByText(/Encountered Pokémon/i);
    expect(pokedexTitle).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const pokeNames = pokemonList.map(({ name }) => name);
    const nextPoke = screen.getByTestId('next-pokemon');

    pokeNames.forEach((names) => {
      const pokemonName = screen.getByText(names);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextPoke);
    });

    const pokemonAL = screen.getByText(pokeNames[0]);
    expect(pokemonAL).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonTypes = screen.getAllByTestId('pokemon-type-button');
    const arrTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    arrTypes.forEach((type, index) => {
      expect(buttonTypes[index]).toHaveTextContent(type);
      userEvent.click(buttonTypes[index]);
      const pokeTypeInScreen = screen.getByTestId('pokemon-type');
      expect(pokeTypeInScreen).toHaveTextContent(type);
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByText(/All/i);
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
  });
});
