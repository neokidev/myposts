import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import dayjs from 'dayjs'
import { type Post } from '../types/post'
import { PostList } from './PostList'

const posts: Post[] = [
  {
    id: '1',
    title: 'Test title 1',
    content: 'Test content 1',
    published: true,
    publishedAt: dayjs().subtract(1, 'day').toDate(),
    createdAt: dayjs().subtract(3, 'day').toDate(),
    updatedAt: dayjs().subtract(2, 'day').toDate(),
  },
  {
    id: '2',
    title: 'Test title 2',
    content: 'Test content 2',
    published: false,
    createdAt: dayjs().subtract(2, 'day').toDate(),
    updatedAt: dayjs().subtract(2, 'day').toDate(),
  },
  {
    id: '3',
    title: 'Test title 3',
    content: 'Test content 3',
    published: true,
    publishedAt: dayjs().subtract(1, 'day').toDate(),
    createdAt: dayjs().subtract(3, 'day').toDate(),
    updatedAt: dayjs().toDate(),
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
  args: { posts, editPostUrl: () => '#', onDeletePost: () => null },
}

export const OpenFirstPostDetailMenu: Story = {
  args: { posts, editPostUrl: () => '#', onDeletePost: () => null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const detailButtons = canvas.getAllByRole('button', { name: 'detail' })
    const firstDetailButton = detailButtons[0] as HTMLElement
    await Promise.resolve(userEvent.click(firstDetailButton))
  },
}
