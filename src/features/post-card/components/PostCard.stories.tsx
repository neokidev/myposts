import { type Post } from '@/features/post-card/types/post'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { PostCard } from './PostCard'

const post: Post = {
  id: '1',
  title: 'Test title 1',
  authorName: 'User 1',
  createdAt: dayjs().subtract(3, 'day').toDate(),
}

const meta: Meta<typeof PostCard> = {
  title: 'Features/PostCard/PostCard',
  component: PostCard,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof PostCard>

export const Default: Story = {
  args: {
    post,
  },
  decorators: [
    (Story) => (
      <div className="w-[18rem]">
        <Story />
      </div>
    ),
  ],
}
