/**
 * @jest-environment jsdom
 */
const { fireEvent } = require('@testing-library/dom')
require('@testing-library/jest-dom')

describe('Landing Page Interactions', () => {
  let header, hamburger, navMenu, body

  beforeEach(() => {
    document.body.innerHTML = `
      <header id="header"></header>
      <div class="hamburger"></div>
      <nav class="nav-menu"></nav>
    `
    header = document.getElementById('header')
    hamburger = document.querySelector('.hamburger')
    navMenu = document.querySelector('.nav-menu')
    body = document.body
  })

  test('adds "scrolled" class to header when scrollY > 50', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    const event = new Event('scroll')
    window.dispatchEvent(event)

    expect(header.classList.contains('scrolled')).toBe(true)
  })

  test('removes "scrolled" class from header when scrollY <= 50', () => {
    header.classList.add('scrolled')
    Object.defineProperty(window, 'scrollY', { value: 30, writable: true })
    const event = new Event('scroll')
    window.dispatchEvent(event)

    expect(header.classList.contains('scrolled')).toBe(false)
  })

  test('toggles mobile menu and overflow on hamburger click', () => {
    fireEvent.click(hamburger)

    expect(hamburger).toHaveClass('active')
    expect(navMenu).toHaveClass('active')
    expect(body.style.overflow).toBe('hidden')

    fireEvent.click(hamburger)

    expect(hamburger).not.toHaveClass('active')
    expect(navMenu).not.toHaveClass('active')
    expect(body.style.overflow).toBe('')
  })
})
