import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../utils/api';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getPosts = async () => {
            const { data } = await fetchPosts(token);
            setPosts(data);
        };
        getPosts();
    }, [token]);

    return (
        <div>
            <h1>Feed</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.username}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}
