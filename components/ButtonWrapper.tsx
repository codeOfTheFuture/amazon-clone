"use client";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";

interface Props {
	children: ReactNode;
	className: string;
	onClick: () => void;
}

const ButtonWrapper: FC<
	DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> &
		Props
> = ({ children, className, onClick, ...props }) => {
	return (
		<button className={className} onClick={onClick} type="button" {...props}>
			{children}
		</button>
	);
};

export default ButtonWrapper;
