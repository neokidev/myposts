import type { Meta, StoryObj } from '@storybook/react'
import { PostItemSkeleton } from './PostItemSkeleton'

const meta: Meta<typeof PostItemSkeleton> = {
  title: 'Features/Dashboard/PostItemSkeleton',
  component: PostItemSkeleton,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof PostItemSkeleton>

export const Default: Story = {
  args: {},
}
