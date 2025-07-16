import React, { useState } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { RouteSearch } from '@/helpers/RouteName'

const SearchBox = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState()
    const getInput = (e) => {
        setQuery(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(RouteSearch(query))
    }
    return (
        <form onSubmit={handleSubmit} className="w-full">
            <Input
                name="q"
                onInput={getInput}
                placeholder="Search here..."
                className="h-11 w-full rounded-full bg-popover text-foreground placeholder:text-muted-foreground px-5 focus:ring-2 focus:ring-primary/60 focus:outline-none border-0 transition-all duration-200"
                autoComplete="off"
            />
        </form>

    )
}

export default SearchBox