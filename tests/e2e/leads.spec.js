// import { test, expect } from '@playwright/test'
const { test, expect } = require('../support')
import { faker } from '@faker-js/faker'

test('teste cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)

});

test('não deve cadastrar um lead com email já existente', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

  await page.toast.containText(message)

});

// @ts-ignore
test('não deve cadastrar com email incorreto', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('João Pedro', 'joao.pedro.com')

  await page.landing.alertHaveText('Email incorreto')
});

// @ts-ignore
test('não deve cadastrar com campo nome vazio', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'joao.pedro@example.com')

  await page.landing.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar com campo email vazio', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('João Pedro', '')

  await page.landing.alertHaveText('Campo obrigatório')
});


test('não deve cadastrar com os campos vazios', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')

  await page.landing.alertHaveText([
    'Campo obrigatório', 
    'Campo obrigatório'
  ])
  
});