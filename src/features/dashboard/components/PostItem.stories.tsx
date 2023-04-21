import { type Post } from '@prisma/client'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import dayjs from 'dayjs'
import { PostItem } from './PostItem'

const post: Post = {
  id: '1',
  title: 'Test title',
  content: 'Test content',
  published: true,
  createdAt: dayjs().subtract(3, 'day').toDate(),
  updatedAt: dayjs().subtract(2, 'day').toDate(),
  authorId: '1',
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
  args: { post, postUrl: '#', editUrl: '#', onDelete: () => null },
}

export const DraftPost: Story = {
  args: {
    post: {
      ...post,
      published: false,
    },
    postUrl: '#',
    editUrl: '#',
    onDelete: () => null,
  },
}

export const OpenDetailMenu: Story = {
  args: {
    post,
    postUrl: '#',
    editUrl: '#',
    onDelete: () => null,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const detailButton = canvas.getByRole('button', { name: 'detail' })
    await Promise.resolve(userEvent.click(detailButton))
  },
}
