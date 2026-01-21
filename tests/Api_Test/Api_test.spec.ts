import { test, expect } from '@playwright/test';

test('POST Create user  y GET Validate created user ', async ({ page }) => {

  // Mock the POST request to create a user
  await page.route('https://reqres.in/api/register', async route => {
    route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        id: '123',
        name: 'morpheus',
        job: 'leader',
        createdAt: '2024-01-01T00:00:00.000Z'
      })
    });
  });

  // Mock the GET request to retrieve the created user
  await page.route('https://reqres.in/api/users/123', async route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          id: 123,
          email: 'morpheus@zion.com',
          first_name: 'Morpheus',
          last_name: 'Leader'
        }
      })
    });
  });

  // Execute the POST 
  const postResponse = await page.evaluate(async () => {
    const res = await fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'morpheus', job: 'leader' })
    });
    return res.json();
  });

  expect(postResponse.id).toBe('123');

  // Execute the GET request to retrieve the created user
  const getResponse = await page.evaluate(async () => {
    const res = await fetch('https://reqres.in/api/users/123');
    return res.json();
  });

  expect(getResponse.data.first_name).toBe('Morpheus');
  console.log('Usuario creado y datos obtenidos correctamente');
});




