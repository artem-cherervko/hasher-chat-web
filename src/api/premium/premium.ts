const api = `${process.env.NEXT_PUBLIC_API_URL}premium/`

async function getPremium(uin: string) {
	const response = await fetch(`${api}${uin}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	})
	const data = await response.json()
	return data
}

async function getExpire(uin: string) {
	const response = await fetch(`${api}/expire/${uin}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	})
	const data = await response.json()
	return data
}

async function addPremium(uin: string) {
	const response = await fetch(`${api}/add/${uin}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	})
	const data = await response.json()
	if (data.status === 200) {
		window.location.reload()
	}
	return data
}

async function removePremium(uin: string) {
	const response = await fetch(`${api}/remove/${uin}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	})
	const data = await response.json()
	if (data.status === 200) {
		window.location.reload()
	}
	return data
}

export { getPremium, getExpire, addPremium, removePremium }
