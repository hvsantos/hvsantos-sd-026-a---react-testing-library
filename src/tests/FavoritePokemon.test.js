import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('3. Teste o componente <FavoritePokemon.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokémon found', () => {
    renderWithRouter(<FavoritePokemon />);
    const textInScreen = screen.getByText(/No favorite pokémon found/i);
    expect(textInScreen).toHaveTextContent(/No favorite pokémon found/i);
  });
});
