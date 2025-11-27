import './index.css';
import type { ReactNode } from 'react';

interface ContainerProps {
	children: ReactNode;
	className?: string;
}

export const ContentContainer = ({
	children,
	className = '',
}: ContainerProps) => {
	return <div className={`container__card ${className}`}>{children}</div>;
};

export default ContentContainer;
