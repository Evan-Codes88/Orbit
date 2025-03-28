import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../src/components/Navbar'; 

describe('Navbar', () => {
  test('should render Navbar component', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check if an element in the Navbar is being rendered
    const logoElement = screen.getByText(/Orbit/i);
    expect(logoElement).toBeInTheDocument();
  });
});
