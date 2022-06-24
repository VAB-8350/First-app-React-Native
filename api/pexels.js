
export const getImages = async (searchTerm = 'programming') => {
  const response = await fetch(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
    method: "GET",
    headers: {"Content-type": "application/json;charset=UTF-8",
    Authorization: '563492ad6f917000010000017a6357b6bcbd47ed8506867829cc724e'
  }
  })

  const json = response.json()

  return json
}

export const nextPage = async (page) => {
  const response = await fetch(`${page}`, {
    method: "GET",
    headers: {"Content-type": "application/json;charset=UTF-8",
    Authorization: '563492ad6f917000010000017a6357b6bcbd47ed8506867829cc724e'
  }
  })

  const json = response.json()

  return json
}