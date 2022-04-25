import { render, screen } from "@testing-library/react";

import { mocked } from "jest-mock";
import Posts, { getStaticProps } from "../pages/posts";
import { createClient } from "../services/prismicio";

const posts = [
  {
    slug: 'my-new-post', title: 'My New Post', excerpt: 'Post excerpt', updatedAt: 'March, 10'
  }
]

jest.mock('../services/prismicio')

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  })

  it('loads initial data', async () => {
    const mockedGetPrismicClient = mocked(createClient)
    mockedGetPrismicClient.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: 'my-new-post',
          data: {
            title: [
              {
                type: "heading", text: "My new post"
              }
            ],
            content: [
              {
                type: "paragraph", text: "Post excerpt"
              }
            ]
          },
          last_publication_date: '04-01-2022'
        }
      ])
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(expect.objectContaining({
      props: {
        posts: [{
          slug: 'my-new-post', title: 'My new post', excerpt: 'Post excerpt', updatedAt: '01 de abril de 2022'
        }]
      }
    }))
  })
})