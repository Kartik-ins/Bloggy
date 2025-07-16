import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { Sparkles } from "lucide-react"
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
    const user = useSelector(state => state.user)
    const { data: categoryData } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    })

    return (
        <Sidebar>
            <SidebarHeader className="bg-card border-b border-border flex items-center justify-center h-16">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-7 h-7 text-primary" />
                    <span className="font-bold text-xl tracking-tight text-foreground">Bloggy</span>
                </div>
            </SidebarHeader>
            <SidebarContent className="bg-card text-foreground">
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem asChild>
                            <Link to={RouteIndex} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                                <IoHomeOutline />
                                <span>Home</span>
                            </Link>
                        </SidebarMenuItem>

                        {user && user.isLoggedIn
                            ? <>
                                <SidebarMenuItem asChild>
                                    <Link to={RouteBlog} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                                        <GrBlog />
                                        <span>Blogs</span>
                                    </Link>
                                </SidebarMenuItem>
                                <SidebarMenuItem asChild>
                                    <Link to={RouteCommentDetails} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                                        <FaRegComments />
                                        <span>Comments</span>
                                    </Link>
                                </SidebarMenuItem>
                            </>
                            :
                            <></>
                        }
                        {user && user.isLoggedIn && user.user.role === 'admin'
                            ? <>
                                <SidebarMenuItem asChild>
                                    <Link to={RouteCategoryDetails} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                                        <BiCategoryAlt />
                                        <span>Categories</span>
                                    </Link>
                                </SidebarMenuItem>

                                <SidebarMenuItem asChild>
                                    <Link to={RouteUser} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                                        <LuUsers />
                                        <span>Users</span>
                                    </Link>
                                </SidebarMenuItem>
                            </>
                            :
                            <></>
                        }

                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Categories
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.category.length > 0
                            && categoryData.category.map(category => <SidebarMenuItem asChild key={category._id}>
                                <Link to={RouteBlogByCategory(category.slug)} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                                    <GoDot />
                                    <span>{category.name}</span>
                                </Link>
                            </SidebarMenuItem>)
                        }

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    )
}

export default AppSidebar