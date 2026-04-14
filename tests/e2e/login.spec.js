// import { test, expect } from '@playwright/test'
const { test } = require('../support')


test('deve logar como admin', async ({ page }) => {
    await page.login.visit()    
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
})

test('não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit()    
    await page.login.submit('admin@zombieplus.com', 'wrongpassword')
    const  message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."

    await page.toast.containText(message)
})

test('não deve logar com email inválido', async ({ page }) => {
    await page.login.visit()    
    await page.login.submit('www.example.com', 'pwd123')
    await page.login.alertHaveText('Email incorreto')
})

test('não deve logar com email vazio', async ({ page }) => {
    await page.login.visit()    
    await page.login.submit('', 'pwd123')
    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar com senha vazio', async ({ page }) => {
    await page.login.visit()    
    await page.login.submit('admin@zombieplus.com', '')
    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar com email e senha vazios', async ({ page }) => {
    await page.login.visit()    
    await page.login.submit('', '')
    await page.login.alertHaveText([
        'Campo obrigatório', 
        'Campo obrigatório'
    ])
})