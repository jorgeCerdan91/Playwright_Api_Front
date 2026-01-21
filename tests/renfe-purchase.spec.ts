import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';


test('Purchase one-way ticket Madrid → Barcelona  ', async ({ page }) => {
  
  const home = new HomePage(page);
  await home.navigate();
  await home.acceptCookies();

  await home.selectOrigin('MADRID-ATOCHA CERCANÍAS');
  await home.selectDestination('BARCELONA-SANTS');

  const currentDate = new Date().toLocaleDateString('sv-SE'); 
   await home.selectDate(currentDate);
   await home.searchPerfectTicket();
   const modalText = await home.getTextModal();
   expect(modalText,"La modal se visualiza correctamente").toContain('Cambia de forma gratuita tu billete');;
});
