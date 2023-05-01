import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { SubmitButton } from './SubmitButton'

const meta: Meta<typeof SubmitButton> = {
  title: 'Features/EditPost/SubmitButton',
  component: SubmitButton,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof SubmitButton>

export const Default: Story = {
  args: {},
}

Default.decorators = [
  (Story) => (
    <div className="mb-36 flex justify-center">
      <div className="flex w-[7.125rem] justify-end">
        <Story />
      </div>
    </div>
  ),
]

export const DraftMode: Story = {
  args: { published: false },
}

DraftMode.decorators = [
  (Story) => (
    <div className="mb-36 flex justify-center">
      <div className="flex w-[7.125rem] justify-end">
        <Story />
      </div>
    </div>
  ),
]

export const OpenMenu: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const expandButton = canvas.getByRole('button', {
      expanded: false,
    })
    await Promise.resolve(userEvent.click(expandButton))
  },
}

OpenMenu.decorators = [
  (Story) => (
    <div className="mb-36 flex justify-center">
      <div className="flex w-[7.125rem] justify-end">
        <Story />
      </div>
    </div>
  ),
]

export const OpenMenuDraftMode: Story = {
  args: { published: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const expandButton = canvas.getByRole('button', {
      expanded: false,
    })
    await Promise.resolve(userEvent.click(expandButton))
  },
}

OpenMenuDraftMode.decorators = [
  (Story) => (
    <div className="mb-36 flex justify-center">
      <div className="flex w-[7.125rem] justify-end">
        <Story />
      </div>
    </div>
  ),
]

export const Disabled: Story = {
  args: { disabled: true },
}

Disabled.decorators = [
  (Story) => (
    <div className="flex justify-center">
      <div className="flex w-[7.125rem] justify-end">
        <Story />
      </div>
    </div>
  ),
]
