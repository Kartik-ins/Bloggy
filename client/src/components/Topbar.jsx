import React, { useState } from 'react'
import { Sparkles, User2 } from "lucide-react"
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { removeUser } from '@/redux/user/user.slice';
import { showToast } from '@/helpers/showToast';
import { getEvn } from '@/helpers/getEnv';
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from './ui/sidebar';


const Topbar = () => {
    const { toggleSidebar } = useSidebar()
    const [showSearch, setShowSearch] = useState(false)
    const dispath = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)


    const handleLogout = async () => {
        try {
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/logout`, {
                method: 'get',
                credentials: 'include',
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispath(removeUser())
            navigate(RouteIndex)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }

    return (
        <div className='flex justify-between items-center h-16 fixed w-full z-20 bg-card px-5 border-b border-border'>
            <div className='flex justify-center items-center gap-2'>
                <button onClick={toggleSidebar} className='md:hidden' type='button'>
                    <AiOutlineMenu />
                </button>
                <Link to={RouteIndex} className="flex items-center gap-2">
                    <Sparkles className="w-7 h-7 text-primary" />
                    <span className="font-bold text-xl tracking-tight">Bloggy</span>
                </Link>
            </div>
            <div className='w-[500px]'>
                <div className={`md:relative md:block absolute bg-popover left-0 w-full md:top-0 top-16 md:p-0 p-2 border border-border rounded-lg shadow-lg transition-colors duration-200 ${showSearch ? 'block' : 'hidden'}`}>
                    <SearchBox />
                </div>
            </div>
            <div className='flex items-center gap-5'>

                <button onClick={toggleSearch} type='button' className='md:hidden block'>
                    <IoMdSearch size={25} />
                </button>

                {!user.isLoggedIn ?
                    <Button asChild className="rounded-full">
                        <Link to={RouteSignIn}  >
                            <MdLogin />
                            Sign In
                        </Link>
                    </Button>
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                {user.user?.avatar ? (
                                  <AvatarImage src={user.user.avatar} />
                                ) : (
                                  <User2 className="w-8 h-8 text-muted-foreground" />
                                )}
                            </Avatar>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <p>{user.user.name}</p>
                                <p className='text-sm'>{user.user.email}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link to={RouteProfile}>
                                    <FaRegUser />
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link to={RouteBlogAdd}>
                                    <FaPlus />
                                    Create Blog
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                <IoLogOutOutline color='red' />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                }


            </div>



        </div >
    )
}

export default Topbar