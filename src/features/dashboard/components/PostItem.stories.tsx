import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import dayjs from 'dayjs'
import { type Post } from '../types/post'
import { PostItem } from './PostItem'

const post: Post = {
  id: '1',
  title: 'Test title',
  content: 'Test content',
  published: true,
  publishedAt: dayjs().subtract(1, 'day').toDate(),
  createdAt: dayjs().subtract(3, 'day').toDate(),
  updatedAt: dayjs().subtract(2, 'day').toDate(),
}

const meta: Meta<typeof PostItem> = {
  title: 'Features/Dashboard/PostItem',
  component: PostItem,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof PostItem>

export const PublishedPost: Story = {
  args: { post, editUrl: '#', onDelete: () => null },
}

export const DraftPost: Story = {
  args: {
    post: {
      ...post,
      published: false,
    },
    editUrl: '#',
    onDelete: () => null,
  },
}

export const OpenDetailMenu: Story = {
  args: { post, editUrl: '#', onDelete: () => null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const detailButton = canvas.getByRole('button', { name: 'detail' })
    await Promise.resolve(userEvent.click(detailButton))
  },
}
