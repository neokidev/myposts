import type { Meta, StoryObj } from '@storybook/react'
import { IconAlertCircle } from '@tabler/icons-react'
import { type FC } from 'react'
import { DropdownMenu } from './DropdownMenu'

type ExampleDropdownMenuProps = {
  align?: 'start' | 'end' | 'center'
}

const ExampleDropdownMenu: FC<ExampleDropdownMenuProps> = ({ align }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="bg-black rounded-md px-4 py-2 text-white text-sm">
          Open
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align={align}>
        <DropdownMenu.Group>
          <div className="px-2.5 py-1.5 space-y-0.5">
            <div className="font-semibold">Username</div>
            <div className="text-gray-400 text-xs">email@example.com</div>
          </div>
        </DropdownMenu.Group>
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <button onClick={() => alert('click dashboard item')}>
              Dashboard
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Group>

        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <button>Sign out</button>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Group>
          <DropdownMenu.Item className="font-medium text-red-500 hover:bg-red-50 focus:bg-red-50">
            <button>
              <IconAlertCircle className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Delete this post
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const meta: Meta<typeof ExampleDropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: ExampleDropdownMenu,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof ExampleDropdownMenu>

export const Default: Story = {
  args: {},
}

export const AlignStart: Story = {
  args: { align: 'start' },
}

export const AlignEnd: Story = {
  args: { align: 'end' },
}
