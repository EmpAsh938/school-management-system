export const getRequest = async (path) => {
    try {
        const req = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${path}`)
        const res = await req.json()
        return res.body
    } catch (error) {
        console.log(error)        
    }
}

export const postRequest = async (path, data) => {
    try {
        const req = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await req.json()
        if (res.success){
            return res.body
        }
        return res.message 
    } catch (error) {
        console.log(error)        
    }
}
export const putRequest = async (path, data) => {
    try {
        const req = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await req.json()
        if (res.success){
            return res.body
        }
        return res.message 
    } catch (error) {
        console.log(error)        
    }
}
export const deleteRequest = async (path, data) => {
    try {
        const req = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await req.json()
        if (res.success){
            return res.body
        }
        return res.message 
    } catch (error) {
        console.log(error)        
    }
}