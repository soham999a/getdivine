export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 bg-white dark:bg-darkTheme-background border-t border-gray-200 dark:border-darkTheme-border text-center text-gray-500 dark:text-darkTheme-muted text-sm mt-12">
      © {new Date().getFullYear()} Devine Studio. All rights reserved.
    </footer>
  );
}
