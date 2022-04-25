import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { mocked } from 'jest-mock';
import { SigninButton } from '.';

jest.mock('next-auth/react')

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const mockedUseSession = mocked(useSession);
    mockedUseSession.mockReturnValueOnce({ data: null, status: 'unauthenticated' })

    render(
      <SigninButton />
    )

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  })

  it('renders correctly when user is authenticated', () => {
    const mockedUseSession = mocked(useSession);
    mockedUseSession.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          image: 'mock-image'
        },
        expires: "mock expire"
      },
      status: 'authenticated'
    })

    render(
      <SigninButton />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  })

})
