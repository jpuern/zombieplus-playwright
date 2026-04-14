import { expect } from "@playwright/test";

export class LandingPage {
    constructor(page) {
        this.page = page;
    }
    
    async visit() {
        await this.page.goto('http://localhost:3000/');
    }

    async openLeadModal() {
        // await page.click("//button[text()='Aperte o play... se tiver coragem']")
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }
    async submitLeadForm(name, email) {
        // await page.locator('#name').fill('João Pedro')
        // await page.locator('input[name=name]').fill('João Pedro')
        // await page.locator('input[placeholder="Seu nome completo"]').fill('João Pedro')
        await this.page.getByPlaceholder('Informe seu nome').fill(name)
        await this.page.getByPlaceholder('Informe seu email').fill(email)

        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click()
    }

    // Com esse sequencia de passos é possível pegar elementos flutuantes, salvar o html pelo playwright
    // --ui e assim extrair dados do elemento flutuante
    // await this.page.getByText('seus dados conosco').click()
    // const content = await this.page.content()
    // console.log(content)

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }   
}