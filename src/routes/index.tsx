import {createFileRoute, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  loader: () => {
      throw redirect({
          to: '/scheduling',
          search: {
              search: '',
              view: 'list',
              date: new Date()
          },
      })
  },
})