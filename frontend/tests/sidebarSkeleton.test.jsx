import { render, screen } from '@testing-library/react';
import SidebarSkeleton from '../src/components/skeletons/SidebarSkeleton.jsx';

test('renders 8 skeleton contacts and their structure', () => {
  // Render the SidebarSkeleton component
  render(<SidebarSkeleton />);

  // Ensure 8 skeleton items are rendered
  const skeletonItems = screen.getAllByRole('article');
  expect(skeletonItems).toHaveLength(8);

  // Ensure each skeleton item has 3 skeleton elements (1 avatar + 2 user info)
  skeletonItems.forEach((item) => {
    const avatar = item.querySelector('figure > div.skeleton');
    const userInfo = item.querySelectorAll('div.skeleton'); 

    // Ensure the avatar skeleton and user info skeletons are present
    expect(avatar).toBeInTheDocument();
    expect(userInfo.length).toBe(3); 
  });

  // Verify that the total number of skeleton elements is 24 (8 contacts * 3 skeletons each)
  const skeletonText = screen.getAllByText('', { selector: '.skeleton' });
  expect(skeletonText).toHaveLength(24); 
});
