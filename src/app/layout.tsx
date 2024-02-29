'use client';
import './globals.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {usePathname, useRouter} from 'next/navigation';
import {ReactNode, useEffect, useState} from 'react';
import {getToken} from '@/utils/get-token';
import {PRIVATE_ROUTES, PUBLIC_ROUTES} from "@/utils/routes";
import {UIProvider} from "@/context/auth.context";
import {Header} from "@/components/Header/Header";
import {Footer} from "@/components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

function RouteChecker({children}: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const accessToken = getToken();
    const isPublicURI = Object.values(PUBLIC_ROUTES).includes(pathname);
    const isPrivateURI = Object.values(PRIVATE_ROUTES).includes(pathname);

    if (isPrivateURI && accessToken) {
        return children
    }

    if (isPublicURI && accessToken) {
        router.replace('/jobs');
        return null
    }

    if (isPublicURI && !accessToken) {
        return children
    }

    if (!isPublicURI && accessToken) {
        return children
    }

    router.replace('/');

    return null
}

export default function RootLayout({children}: { children: React.ReactNode; }) {
    const accessToken = getToken();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            {/* @ts-ignore */}
            <UIProvider>
                <html>
                <head>
                    <title>Assigment</title>
                </head>
                <body className={`h-screen w-full`}>
                {isMounted && (
                    <RouteChecker>
                        <div className={`flex flex-col p-2 h-screen w-full ${!accessToken ? 'justify-between' : ''}`}>
                            <Header/>
                                {children}
                            <ToastContainer />
                            {!accessToken && <Footer/>}
                        </div>
                    </RouteChecker>
                )}
                </body>
                </html>
            </UIProvider>
        </QueryClientProvider>
    );
}
