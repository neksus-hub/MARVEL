import  { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const request = useCallback( async (url, method = 'GET', body=null, headers = {'Contetn-Type': 'application/json'}) => {

        setLoading(true)

        try{
            const response = await fetch(url, {method, body, headers})
        } 
        catch(error){

        }
    })
}