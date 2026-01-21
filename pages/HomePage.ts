import { Page, expect } from '@playwright/test';
export class HomePage {
  constructor(private page: Page) { }
  async navigate() {

    await this.page.goto('https://www.renfe.com/es/es');
  }

  async acceptCookies() {
    await this.page.getByRole('button', { name: 'Aceptar todas las cookies' }).click();

  }

  async selectOrigin(origin: string) {
    await this.page.locator('#origin').fill(origin);
    await this.page.getByRole('option', { name: origin }).click();
  }

  async selectDestination(destination: string) {
    await this.page.locator('#destination').fill(destination);
    await this.page.getByRole('option', { name: destination }).click();
  }
  async selectDate(date: string) {
    await this.page.getByPlaceholder('Fecha ida').first().click();
    await this.page.getByText('Viaje solo ida').click();
    await this.page.locator('button[type="submit"]').click();;
  

  }

  async searchPerfectTicket() {
    await this.page.waitForTimeout(2000);
    await this.page.locator('.move_to_tomorrow').first().click();
    // Repeat up to 20 tiemes 

    for (let i = 0; i < 20; i++) {

    // Get a quote 

      const precioTexto = await this.page.locator('.precio-final').first().textContent();

      // If the price contains the number "5" (€50-59), buy it

      if (precioTexto && precioTexto.includes('5')) {
        
        await this.page.locator('.selectedTren').first().click();
        await this.page.locator('[data-titulo-tarifa="Básico"]').click();
        await this.page.locator('#btnSeleccionar').first().click();
        break; 
        
      // Exit the loop if a good ticket is found
      }

      // If the price is incorrect, please come back the next day.
      await this.page.locator('.move_to_tomorrow').first().click();
    }

  }

  async getTextModal() {
    return this.page.locator("div[class='fareupg-benefits']").textContent();
  }


};
