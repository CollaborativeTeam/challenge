export function Loader ({ color }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			style={{
				margin: "auto",
				background: "0 0",
				display: "block",
				shapeRendering: "auto"
			}}
			width={171}
			height={171}
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
		>
			<circle
				cx={50}
				cy={50}
				fill="none"
				stroke={color}
				strokeWidth={7}
				r={35}
				strokeDasharray="164.93361431346415 56.97787143782138"
			>
				<animateTransform
					attributeName="transform"
					type="rotate"
					repeatCount="indefinite"
					dur="1.3513513513513513s"
					values="0 50 50;360 50 50"
					keyTimes="0;1"
				/>
			</circle>
		</svg>
	);
}
