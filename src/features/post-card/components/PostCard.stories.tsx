import { type Post } from '@prisma/client'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import range from 'lodash/range'
import { PostCard } from './PostCard'

const post: Post = {
  id: '1',
  title: 'Test title 1',
  content: 'Test content 1',
  published: true,
  createdAt: dayjs().subtract(3, 'day').toDate(),
  updatedAt: dayjs().subtract(2, 'day').toDate(),
  authorId: '1',
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
    authorName: 'Test author name',
  },
  decorators: [
    (Story) => (
      <div className="max-w-[18rem]">
        <Story />
      </div>
    ),
  ],
}

export const Grid: Story = {
  args: {
    post,
    authorName: 'Test author name',
    width: 280,
  },
  decorators: [
    (Story) => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {range(10).map((index) => (
          <div key={index} className="max-w-[18rem]">
            <Story />
          </div>
        ))}
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
}
