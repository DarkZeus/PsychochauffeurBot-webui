import {createFileRoute} from '@tanstack/react-router';
import {SchedulingPage} from '../scheduling/scheduling.page.tsx';

// Define route with properly handled defaults
export const Route = createFileRoute('/scheduling')({
    component: SchedulingPage,
    validateSearch: (search: Record<string, unknown>) => {
        // Always return a complete object with defaults
        return {
            search: typeof search.search === 'string' ? search.search : '',
            view: search.view === 'calendar' ? 'calendar' : 'list',
            date: search.date instanceof Date ? search.date :
                typeof search.date === 'string' ? new Date(search.date) : new Date()
        };
    },
    // Optional: make sure URL reflects the validated search parameters
    beforeLoad: ({search, location, navigate}) => {
        if (
            search.search !== search.search ||
            search.view !== search.view ||
            (search.date === undefined && search.date)
        ) {
            const newSearch = new URLSearchParams();
            newSearch.set('search', search.search);
            newSearch.set('view', search.view);
            newSearch.set('date', search.date.toISOString());

            // Update URL with defaults
            navigate({
                to: location.pathname,
                search: Object.fromEntries(newSearch.entries()),
                replace: true
            });

            return false; // Prevents the route from loading until after the navigation
        }
    }
});

export default SchedulingPage;