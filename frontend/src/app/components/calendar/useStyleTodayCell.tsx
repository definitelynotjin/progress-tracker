"use client";

import { useEffect } from "react";

export function useStyleTodayCell() {
    useEffect(() => {
        function styleTodayCell() {
            const todayCell = document.querySelector('td.fc-day.fc-day-today') as HTMLElement | null;
            if (todayCell) {
                todayCell.style.background = '#1e293b';
                const dayNumber = todayCell.querySelector('.fc-daygrid-day-number') as HTMLElement | null;
                if (dayNumber) {
                    dayNumber.style.color = '#fffff';
                    dayNumber.style.fontWeight = '700';
                    dayNumber.style.textShadow = '0 1px 2px rgba(0,0,0,0.15)';
                }
            }
        }

        styleTodayCell();

        const calendarRoot = document.querySelector('.fc');
        if (!calendarRoot) return;

        const observer = new MutationObserver(styleTodayCell);
        observer.observe(calendarRoot, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);
}
