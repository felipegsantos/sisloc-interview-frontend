import Image from 'next/image'
import { LoginFormComponent } from './components/LoginForm';

export const metadata = {
    title: 'Entrar',
}

export default async function SignIn() {
    return (
        <div className="container mx-auto">
            <LoginFormComponent />
        </div>
    );
}
