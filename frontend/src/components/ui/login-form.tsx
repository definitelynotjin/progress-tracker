export default function LoginForm() {
	return (
		<form className="flex flex-col gap-2">
			<input placeholder="Email" type="email" className="border p-2 rounded" />
			<input
				placeholder="Password"
				type="password"
				className="border p-2 rounded"
			/>
			<button type="submit" className="bg-gray-700 text-white p-2 rounded mt-2">
				Login
			</button>
		</form>
	);
}
