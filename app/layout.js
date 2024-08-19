// additional root layout
// actualy this app can work fine without this file,
// but redirect not work if the redirect target has different root layout
// it need this root layout

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