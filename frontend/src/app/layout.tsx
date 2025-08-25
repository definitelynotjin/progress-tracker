import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import './sidebar-hover.css';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	weight: ['400', '600'],
});

export const metadata: Metadata = {
	title: 'Icon Progress Tracker',
	description: 'Kanban Progress Tracker',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
