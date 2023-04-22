import { type Post } from '@prisma/client'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import dayjs from 'dayjs'
import { PostList } from './PostList'

const posts: Post[] = [
  {
    id: '1',
    title: 'Test title 1',
    content: 'Test content 1',
    published: true,
    createdAt: dayjs().subtract(3, 'day').toDate(),
    updatedAt: dayjs().subtract(2, 'day').toDate(),
    authorId: '1',
  },
  {
    id: '2',
    title: 'Test title 2',
    content: 'Test content 2',
    published: false,
    createdAt: dayjs().subtract(2, 'day').toDate(),
    updatedAt: dayjs().subtract(2, 'day').toDate(),
    authorId: '1',
  },
  {
    id: '3',
    title: 'Test title 3',
    content: 'Test content 3',
    published: true,
    createdAt: dayjs().subtract(3, 'day').toDate(),
    updatedAt: dayjs().toDate(),
    authorId: '1',
  },
]

const meta: Meta<typeof PostList> = {
  title: 'Features/Dashboard/PostList',
  component: PostList,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof PostList>

export const ListingPosts: Story = {
  args: {
    posts,
    postUrl: () => '#',
    editPostUrl: () => '#',
    onDeletePost: () => null,
  },
}

export const OpenFirstPostDetailMenu: Story = {
  args: {
    posts,
    postUrl: () => '#',
    editPostUrl: () => '#',
    onDeletePost: () => null,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const detailButtons = canvas.getAllByRole('button', { name: 'detail' })
    const firstDetailButton = detailButtons[0] as HTMLElement
    await Promise.resolve(userEvent.click(firstDetailButton))
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
