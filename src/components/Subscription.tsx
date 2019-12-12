import React, { useState } from 'react'
import styled from '@emotion/styled'

import Headings from '../components/Headings'

const Subscription: React.FC<{}> = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // subscribe to newsletter
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value)
    setError('')
  }

  return (
    <SubscriptionContainer>
      <Heading>Join our email list and get notified about new content</Heading>
      <Text>
        Be the first to receive our latest content with the ability to opt-out at anytime. We promise to not spam your
        inbox or share your email with any third parties.
      </Text>
      <Form onSubmit={handleSubmit} hasError={error}>
        <Input
          placeholder="your@email.com"
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          hasError={error}
        />
        <Button
          type="submit"
          className={[error && 'error', subscribed && 'subscribed'].join(' ')}
          disabled={subscribed}
        >
          {subscribed ? <CheckMarkIcon /> : 'Subscribe'}
        </Button>
        {error && <Error dangerouslySetInnerHTML={{ __html: error }} />}
      </Form>
    </SubscriptionContainer>
  )
}

export default Subscription

const SubscriptionContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 64px 0 55px;
  margin: 10px auto 100px;
  background: var(--color-card);
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
  z-index: 1;
`

const Heading = styled(Headings.h3)`
  margin-bottom: 20px;
`

const Text = styled.p`
  margin: 0 auto 30px;
  color: var(--color-grey);
  line-height: 1.75;
`

const Form = styled.form<{ hasError: string }>`
  position: relative;

  &::after {
    content: '>';
    position: absolute;
    left: 21px;
    top: 10px;
    color: ${p => (p.hasError ? 'var(--color-error)' : 'var(--color-accent)')};
  }
`

const Input = styled.input<{ hasError: string }>`
  position: relative;
  background: ${p => (p.hasError ? 'var(--color-errorBackground)' : 'var(--color-inputBackground)')};
  border-radius: 35px;
  border: none;
  padding: 13px 21px 13px 35px;
  width: 471px;
  color: var(--color-primary);

  ::placeholder {
    color: var(--color-track);
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: var(--color-track);
  }

  ::-ms-input-placeholder {
    color: var(--color-track);
  }
`

const Button = styled.button`
  position: absolute;
  left: 306px;
  top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 161px;
  height: 38px;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  background: transparent;
  font-weight: 600;
  border-radius: 35px;
  letter-spacing: 0.42px;
  transition: border-color 0.2s var(--ease-in-out-quad), background 0.2s var(--ease-in-out-quad),
    color 0.2s var(--ease-in-out-quad);
  &.error {
    border: 1px solid var(--color-error);
    color: var(--color-error);
  }
  &.subscribed {
    background: var(--color-accent);
  }
  &:hover {
    background: var(--color-accent);
    color: var(--color-background);
  }
  &.error:hover {
    background: var(--color-error);
  }

  &[disabled] {
    cursor: not-allowed;
  }

  svg * {
    fill: var(--color-background);
    color: var(--color-background);
  }
`

const Error = styled.div`
  position: absolute;
  left: 35px;
  bottom: -20px;
  color: var(--color-error);
  font-size: 12px;

  a {
    color: var(--color-error);
    text-decoration: underline;
  }
`

const CheckMarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.00016 16.1698L4.83016 11.9998L3.41016 13.4098L9.00016 18.9998L21.0002 6.99984L19.5902 5.58984L9.00016 16.1698Z"
      fill="#08080B"
    />
  </svg>
)
