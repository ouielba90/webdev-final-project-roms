function ClientCard({ client, onDeleteClient}) {
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
		<div className="userClientDiv">
			<div className="client-data">
				<p>
					{client.name} <br />
					{client.email} <br />
					{client.role}
				</p>
			</div>

			<div className="client-actions">
				<div className="estado" style={clientStatus(client.status)}></div>

				<button
					onClick={onDeleteClient}
					className="client-btn">Eliminar
				</button>
			</div>
		</div>
	)
}

export default ClientCard