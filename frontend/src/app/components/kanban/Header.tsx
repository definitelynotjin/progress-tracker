'use client';
import React from 'react';
import NotificationButton from '../notification/NotificationButton';
import ProfileButton from '../profile/ProfileButton';

export default function Header() {
	return (
		<div className="h-20 flex px-8 items-center justify-between bg-gray-800">
			<h1 className="text-3xl pl-1 font-bold text-pink-300">
				Team 123's Board
			</h1>
			<div className="flex items-center gap-4 relative">
				<NotificationButton />
				<ProfileButton />
			</div>
		</div>
	);
}
