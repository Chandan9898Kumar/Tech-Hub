// components/ui/table/Table.tsx
import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ children, className = '' }: TableProps) => {
  return (
    <table className={`w-full border-collapse ${className}`}>
      {children}
    </table>
  );
};

// TableHeader.tsx
export const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return <thead>{children}</thead>;
};

// TableBody.tsx
export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

// TableRow.tsx
interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export const TableRow = ({ children, className = '' }: TableRowProps) => {
  return <tr className={className}>{children}</tr>;
};

// TableHead.tsx
interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export const TableHead = ({ children, className = '' }: TableHeadProps) => {
  return <th className={`p-4 text-left ${className}`}>{children}</th>;
};

// TableCell.tsx
interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCell = ({ children, className = '' }: TableCellProps) => {
  return <td className={`p-4 ${className}`}>{children}</td>;
};

// TableCaption.tsx
interface TableCaptionProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCaption = ({ children, className = '' }: TableCaptionProps) => {
  return (
    <caption className={`p-4 text-sm text-gray-500 ${className}`}>
      {children}
    </caption>
  );
};
