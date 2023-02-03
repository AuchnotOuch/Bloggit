import React, { useEffect, useState } from "react";
import FollowerCard from "../Follows/FollowerCard";



const FeaturedUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch('/api/users', {
                method: 'GET'
            })
            if (response.ok) {
                const data = await response.json()

                let randomUsers = data.users.sort(() => {
                    return .5 - Math.random()
                }).slice(0, 3)

                setUsers(randomUsers)
            }
        }
        getUsers()
    }, [])

    // useEffect(() => {
    //     let usersArr = []
    //     users.forEach(user => postsArr.push(post))
    //     const randomPost = postsArr[Math.floor(Math.random() * (postsArr.length))]
    //     setFeaturedPost(randomPost)
    // }, [posts])


    if (!users) return null
    return (
        <div className='featured-blogs'>
            <div className="followers-container">
                {users.map(user =>
                    <FollowerCard follower={user} key={user.id} />
                )}
            </div>
        </div>
    )
}

export default FeaturedUsers
