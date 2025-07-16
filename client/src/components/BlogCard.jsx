import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { FaRegCalendarAlt } from "react-icons/fa"
import { User2 } from "lucide-react"
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'

const BlogCard = ({ props }) => {
    return (
        <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
            <Card className="pt-5 transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl shadow-lg border-0 bg-zinc-900/90 dark:bg-zinc-900/90">
                <CardContent>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Avatar>
                                {props.author.avatar ? (
                                    <AvatarImage src={props.author.avatar} />
                                ) : (
                                    <User2 className="w-8 h-8 text-muted-foreground" />
                                )}
                            </Avatar>
                            <span className="font-semibold text-base">{props.author.name}</span>
                        </div>
                        {props.author.role === 'admin' && (
                            <Badge variant="outline" className="bg-violet-500 text-white border-0 shadow">
                                Admin
                            </Badge>
                        )}
                    </div>

                    {/* Markdown content with embedded HTML rendering */}
                    <div className='my-4 rounded-lg overflow-hidden max-w-none text-zinc-100 bg-zinc-900/80 p-4'>
                        <ReactMarkdown rehypePlugins={[rehypeRaw]} skipHtml={false}>
                            {props.blogContent}
                        </ReactMarkdown>
                    </div>

                    <div>
                        <p className='flex items-center gap-2 mb-2 text-muted-foreground text-sm'>
                            <FaRegCalendarAlt />
                            <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
                        </p>
                        <h2 className='text-2xl font-bold line-clamp-2 mb-1'>
                            {props.title}
                        </h2>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default BlogCard
