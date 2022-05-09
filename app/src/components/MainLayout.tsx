import { Container } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import './MainLayout.css';

interface Props {
    children: any
}

export const MainLayout = (props: Props) => {
    return (
        <div className="page">
            <div className="sidebar">
                <NavMenu />
            </div>
            <main className='main'>
                <div className="top-row px-4">
                    <a href="https://azure.microsoft.com/en-us/services/app-service/static/" rel="noreferrer" target="_blank">About</a>
                </div>

                <Container className='content px-4'>
                    {props.children}
                </Container>
            </main>
        </div >
    );
};