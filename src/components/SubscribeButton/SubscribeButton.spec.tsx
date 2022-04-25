import { fireEvent, render, screen } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import { mocked } from 'jest-mock';
import { SubscribeButton } from '.';
import { useRouter } from 'next/router';

jest.mock('next-auth/react')

jest.mock('next/router')

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const mockedUseSession = mocked(useSession)
    mockedUseSession.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated'
    })
    render(
      <SubscribeButton />
    )

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  })

  it('redirects user to sign in when not authenticated', () => {
    const mockedSignIn = mocked(signIn)
    const mockedUseSession = mocked(useSession)
    mockedUseSession.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated'
    })

    render(<SubscribeButton />)
    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(mockedSignIn).toHaveBeenCalled();
  })

  it('redirects user to posts when user already has subscription', () => {
    const mockedUseRouter = mocked(useRouter)
    const mockedUseSession = mocked(useSession)
    const mockedPush = jest.fn()

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

    render(<SubscribeButton />)
    const subscribeButton = screen.getByText('Subscribe now')
    fireEvent.click(subscribeButton)

    expect(mockedPush).toHaveBeenCalledWith('/posts');
  })
})
