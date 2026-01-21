import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          ClearFlow
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
          ClearFlow is an intelligent expenses tracker designed to help users
          gain deep insights into their spending habits by automatically
          processing credit card bills and bank statements.
        </p>
      </div>
    </div>
  );
}
