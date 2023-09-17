import { render, screen } from '@testing-library/react';
import TodoList from '../components/todo/Todo';

test('renders TodoList', () => {
  render(<TodoList />);
  const element = screen.getByRole('heading', { name: /Test TodoList/i })
  expect(element).toBeInTheDocument();
});
