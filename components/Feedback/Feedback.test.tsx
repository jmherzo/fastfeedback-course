import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { FeedbackTableHeader } from './FeedbackTableHeader';

test('renders Feedback in table header', async () => {
  render(<FeedbackTableHeader />);
  expect(screen.getByRole('heading')).toHaveTextContent('My Feedback');
});
