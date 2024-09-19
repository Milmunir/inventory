import { Inter } from "next/font/google";
import "./css/globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.6.0/css/all.min.css" />
            </head>
            <html data-bs-theme-mode='light'>
                <body>
                    {children}
                </body>
            </html>
        </>
    );
}