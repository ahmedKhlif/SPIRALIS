import * as React from "react";

const Form = React.Fragment;

function FormField({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

function FormLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-deep-olive">
      {children}
    </label>
  );
}

function FormMessage({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="text-xs text-bottle-green">{children}</p>;
}

export { Form, FormField, FormLabel, FormMessage };
