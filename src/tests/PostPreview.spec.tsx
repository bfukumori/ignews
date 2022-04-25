import { render, screen } from "@testing-library/react";

import { mocked } from "jest-mock";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PostPreview, { getStaticProps } from "../pages/posts/preview/[slug]";


import { createClient } from "../services/prismicio";

const post =
{
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post excerpt</p>',
  updatedAt: 'March, 10'
}

jest.mock('next-auth/react')
jest.mock('../services/prismicio')
jest.mock('next/router')

describe('PostPreview page', () => {
  it('renders correctly', () => {
    const mockedUseSession = mocked(useSession)
    mockedUseSession.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated'
    })

    render(<PostPreview post={post} />)

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  })

  it('redirects user to full post when user is subscribed', async () => {
    const mockedUseSession = mocked(useSession)
    const mockedUseRouter = mocked(useRouter)
    const mockedPush = jest.fn();

    mockedUseSession.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          image: 'mock-image'
        },
        activeSubscription: 'fake-subscription',
        expires: "mock expire"
      },
      status: 'authenticated'
    })

    mockedUseRouter.mockReturnValueOnce({
      push: mockedPush
    } as any)

    render(<PostPreview post={post} />)

    expect(mockedPush).toHaveBeenCalledWith('/posts/my-new-post')
  })

  it('loads  initial data', async () => {
    const mockedGetPrismicClient = mocked(createClient)
    mockedGetPrismicClient.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce(
        {
          data: {
            title: [
              {
                type: "heading", text: "My new post"
              }
            ],
            content: [
              {
                type: "paragraph", text: "Post content"
              }
            ]
          },
          last_publication_date: '04-01-2022'
        }
      )
    } as any)
    const response = await getStaticProps({
      params: {
        slug: 'my-new-post'
      }
    } as any)

    expect(response).toEqual(expect.objectContaining({
      props: {
        post: {
          slug: 'my-new-post',
          title: 'My new post',
          content: '<p>Post content</p>',
          updatedAt: '01 de abril de 2022'
        }
      }
    }))

  })
})