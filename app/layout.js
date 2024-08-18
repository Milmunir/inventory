// additional root layout
// app can work without this file,
// but redirect function wil not work if the function that called redirect has different root layout
// it need root layout that encapsule all route

export default function RootLayout({ children }) {
    return (
        <>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
            </head>
            <html>
                <body>
                    {children}
                </body>
            </html>
        </>
    );
}