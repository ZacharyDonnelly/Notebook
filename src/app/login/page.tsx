'use client';

import Button from '@/components/base/button';
import Checkbox from '@/components/base/checkbox';
import Input from '@/components/base/input';
import { useFormRegister } from '@/utils/hooks/useFormRegister';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import './login.scss';

const Login: React.FC = () => {
  const { register, handleSubmit } = useFormRegister();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const checkboxHandler = (): void => {
    setIsChecked(!isChecked);
  };
  return (
    <section className="login">
      <div className="login_wrapper">
        <header className="login_header">
          <h1>Login</h1>
          <div className="login_logo">
            <Link href="/">
              <Image src="/logos/logo.svg" width={100} height={85} alt="Notebook" />
            </Link>
          </div>
        </header>
        <form className="login_form">
          <div className="login_form_row">
            <Input className="login_input" id="email_address" label_text="Email" />
          </div>
          <div className="login_form_row">
            <Input className="login_input" id="password" label_text="Password" />
          </div>
          <div className="checkbox_row">
            <Checkbox
              id="remember_me"
              name="remember_me"
              labelText="Remember me"
              changeHandler={checkboxHandler}
              checked={isChecked}
            />
          </div>
          <Button className="login_button">
            <Link href="/dashboard">Log in</Link>
          </Button>
        </form>
        <div className="login_oauth_buttons">
          <p className="continue_with">Or continue with</p>
          <div className="oauth_button_group">
            <Button className="google_oauth_button" btnText="Google" onClick={() => signIn('google')} mask>
              <Image src="/icons/google.svg" width={20} height={20} alt="Sign in with Google" />
            </Button>
            <Button className="github_oauth_button" btnText="Github" onClick={() => signIn('github')} mask>
              <Image src="/icons/github.svg" width={20} height={20} alt="Sign in with Github" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
