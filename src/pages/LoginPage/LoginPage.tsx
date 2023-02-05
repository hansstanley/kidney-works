export default function LoginPage() {
	return (
		<div className="container-fluid text-center row">
			<div className="col" />
			<div className="col-6">
				<h2>Login</h2>
				<div className="input-group mb-3">
					<input type="text" className="form-control" placeholder="Username" />
				</div>
				<p>or</p>
				<button type="button" className="btn btn-primary">
					Sign in with Google
				</button>
			</div>
			<div className="col" />
		</div>
	);
}
