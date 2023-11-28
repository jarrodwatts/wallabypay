import React from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * AppContainer component provides a basic layout for the application, centered
 * and with a responsive background gradient.
 *
 * @component
 * @example
 * // Usage in a parent component:
 * <AppContainer>
 *   <h1>My App</h1>
 * </AppContainer>
 *
 * @param {object} props - React props for the AppContainer component.
 * @param {React.ReactNode} props.children - The content to be displayed within the container.
 * @returns {JSX.Element} - Returns the JSX element representing the AppContainer.
 */
export default function AppContainer({ children }: Props) {
  return (
    <main
      className="w-screen h-screen flex items-center justify-center overflow-auto"
      style={{
        // Pretty gradients in the background.
        backgroundImage: `
            radial-gradient(circle farthest-side at -15% 85%, rgba(90, 122, 255, .36), rgba(0, 0, 0, 0) 52%),
            radial-gradient(circle farthest-side at 100% 30%, rgba(245, 40, 145, 0.25), rgba(0, 0, 0, 0) 30%)
          `,
      }}
    >
      {children}
    </main>
  );
}
