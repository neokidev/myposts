import { type Post } from '@/features/post-card/types/post'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import range from 'lodash/range'
import { PostCardGrid } from './PostCardGrid'

const posts: Post[] = range(10).map((index) => ({
  id: `${index}`,
  title: `Test title ${index}`,
  authorName: `User ${index}`,
  createdAt: dayjs().subtract(3, 'day').toDate(),
}))

const meta: Meta<typeof PostCardGrid> = {
  title: 'Features/PostCard/PostCardGrid',
  component: PostCardGrid,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof PostCardGrid>

export const Default: Story = {
  args: {
    posts,
  },
}
