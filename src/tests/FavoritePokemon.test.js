import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('3. Teste o componente <FavoritePokemon.js />', () => {
  test('', () => {
    renderWithRouter(<FavoritePokemon />);
    const textInScreen = screen.getByText(/No favorite pokémon found/i);
    expect(textInScreen).toHaveTextContent(/No favorite pokémon found/i);
  });
});
