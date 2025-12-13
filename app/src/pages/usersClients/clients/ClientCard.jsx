function ClientCard({ client, onDeleteClient, onEditClient }) {
	function clientStatus(estado) {
		if (estado === 'activo') {
			return ({
				background: '#12a912ff',
			})
		}

		if (estado === 'inactivo') {
			return ({
				background: '#bfbfbfff',
			})
		}

		if (estado === 'ausente') {
			return ({
				background: '#ffbf00',
			})
		}

		if (estado === 'ocupado') {
			return ({
				background: '#dc143c',
			})
		}
	}
	return (
		<div className="client-Div">
			<div className="client-data">
				<p>
					{client.name} <br />
					{client.email} <br />
					{client.role}
				</p>
			</div>

			<div>
				<div className="estado" style={clientStatus(client.status)}></div>
				<h1 className="estado-txt">{client.status}</h1>
			</div>

			<div className="btn-box">
				<button
					onClick={onDeleteClient}
					className="client-btn">Eliminar
				</button>
			</div>
		</div>
	)
}

export default ClientCard