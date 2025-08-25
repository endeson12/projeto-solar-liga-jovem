import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renderiza o componente sem erros', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Verifica se o componente principal foi renderizado
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  // Adicione mais testes conforme necessário
});
