import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('2. Teste o componente <About.js />.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByText(/About Pokédex/i);
    expect(aboutTitle).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const twoPar = screen.getAllByText(/Pokémon/i);
    expect(twoPar.length).toBe(2);
  });
  test('Teste se a página contém a imagem de uma Pokédex', () => {
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    renderWithRouter(<About />);
    const imagePoke = screen.getByRole('img');
    expect(imagePoke.src).toBe(url);
  });
});
