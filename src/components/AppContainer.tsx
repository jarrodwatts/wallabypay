import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AppContainer({ children }: Props) {
  return (
    <main
      className="w-screen h-screen flex items-center justify-center overflow-auto"
      style={{
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
