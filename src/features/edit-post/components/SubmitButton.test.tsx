import { composeStories } from '@storybook/react'
import { cleanup, getByRole, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'
import * as stories from './SubmitButton.stories'

const user = userEvent.setup()

afterEach(cleanup)

const { Default, OpenMenu, OpenMenuDraftMode, Disabled } =
  composeStories(stories)

test('switch from publish to draft with selecting menu item', async () => {
  const { container } = render(<OpenMenu />)
  await OpenMenu.play({ canvasElement: container })

  expect(screen.getByRole('button', { name: 'Publish' })).toBeTruthy()

  const menuItems = screen.getAllByRole('menuitem')
  expect(menuItems).toHaveLength(2)

  const draftMenuItem = menuItems[1] as HTMLElement
  const draftMenuButton = getByRole(draftMenuItem, 'button')

  await user.click(draftMenuButton)

  expect(screen.getByRole('button', { name: 'Draft' })).toBeTruthy()
})

test('switch from draft to publish with selecting menu item', async () => {
  const { container } = render(<OpenMenuDraftMode />)
  await OpenMenu.play({ canvasElement: container })

  expect(screen.getByRole('button', { name: 'Draft' })).toBeTruthy()

  const menuItems = screen.getAllByRole('menuitem')
  expect(menuItems).toHaveLength(2)

  const publishMenuItem = menuItems[0] as HTMLElement
  const publishMenuButton = getByRole(publishMenuItem, 'button')

  await user.click(publishMenuButton)

  expect(screen.getByRole('button', { name: 'Publish' })).toBeTruthy()
})

test('switch from publish to draft with publish property', () => {
  const { rerender } = render(<Default published />)
  const publishButton = screen.getByRole('button', { name: 'Publish' })
  expect(publishButton).toBeTruthy()

  rerender(<Default published={false} />)

  const draftButton = screen.getByRole('button', { name: 'Draft' })
  expect(draftButton).toBeTruthy()
})

test('switch from draft to publish with publish property', () => {
  const { rerender } = render(<Default published={false} />)
  const draftButton = screen.getByRole('button', { name: 'Draft' })
  expect(draftButton).toBeTruthy()

  rerender(<Default published />)

  const publishButton = screen.getByRole('button', { name: 'Publish' })
  expect(publishButton).toBeTruthy()
})

test('execute onChangePublished property function when selecting the menu item', async () => {
  let published = true
  const handleChangePublished = (p: boolean) => {
    published = p
  }

  const { container } = render(
    <OpenMenu onChangePublished={handleChangePublished} />
  )
  await OpenMenu.play({ canvasElement: container })

  const menuItems = screen.getAllByRole('menuitem')
  expect(menuItems).toHaveLength(2)

  const draftMenuItem = menuItems[1] as HTMLElement
  const draftMenuButton = getByRole(draftMenuItem, 'button')

  expect(published).toBeTruthy()

  await user.click(draftMenuButton)

  expect(published).toBeFalsy()
})

test('button is disabled', () => {
  render(<Disabled />)

  const submitButton = screen.getByRole('button', {
    name: 'Publish',
  })
  const expandMenuButton = screen.getByRole('button', { name: '' })

  expect((submitButton as HTMLButtonElement).disabled).toBeTruthy()
  expect((expandMenuButton as HTMLButtonElement).disabled).toBeTruthy()
})
