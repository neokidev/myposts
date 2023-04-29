import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test, vi } from 'vitest'
import { SubmitButton } from './SubmitButton'

const user = userEvent.setup()

afterEach(cleanup)

test('use property to control whether to publish or draft', () => {
  const { rerender } = render(<SubmitButton published />)

  const saveButton = screen.getByTestId('save-button')
  expect(saveButton.textContent).toEqual('Publish')

  rerender(<SubmitButton published={false} />)
  expect(saveButton.textContent).toEqual('Draft')
})

test('toggle between publish and draft in the menu', async () => {
  // ARRANGE
  render(<SubmitButton published />)

  const saveButton = screen.getByTestId('save-button')
  const menuButton = screen.getByTestId('menu-button')

  expect(saveButton.textContent).toEqual('Publish')

  await user.click(menuButton)
  screen.getByTestId('check-icon-publish')

  await user.click(screen.getByTestId('menu-item-draft'))
  expect(saveButton.textContent).toEqual('Draft')

  await user.click(menuButton)
  screen.getByTestId('check-icon-draft')

  await user.click(screen.getByTestId('menu-item-publish'))
  expect(saveButton.textContent).toEqual('Publish')

  await user.click(menuButton)
  screen.getByTestId('check-icon-publish')
})

test('execute any function when selecting the menu item', async () => {
  const mockFn = vi.fn()
  render(<SubmitButton published onChangePublished={mockFn} />)

  const menuButton = screen.getByTestId('menu-button')

  expect(mockFn).toBeCalledTimes(0)

  await user.click(menuButton)
  await user.click(screen.getByTestId('menu-item-draft'))

  expect(mockFn).toBeCalledTimes(1)

  await user.click(menuButton)
  await user.click(screen.getByTestId('menu-item-draft'))

  expect(mockFn).toBeCalledTimes(1)
})

test('button is disabled', () => {
  render(<SubmitButton disabled />)

  const saveButton = screen.getByTestId('save-button')
  const menuOpenButton = screen.getByTestId('menu-button')

  expect((saveButton as HTMLButtonElement).disabled).toBeTruthy()
  expect((menuOpenButton as HTMLButtonElement).disabled).toBeTruthy()
})
