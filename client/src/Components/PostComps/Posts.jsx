import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { BlockUI } from 'primereact/blockui';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import AddPost from './AddPost';
import UpdatePost from './UpdatePost';

const Posts = ()=>{
    const [postsList, setPostsList] = useState([])
    const [layout, setLayout] = useState('list')
    const [blocked, setBlocked] = useState(false)
    const [isCreating, setIsCreating] = useState(true);
    const [currentPost, setCurrentPost] = useState({});

    useEffect(() => {
        getAllPosts()
    },[]);
    useEffect(() => {
        getAllPosts()
    }, [blocked]);

    const getAllPosts = async()=>{
        try{
            const res = await axios.get('http://localhost:8888/api/posts')
            setPostsList(res.data)
        } catch(e){
            console.error(e)
        }
    }
    

    const deletePost = async (id) => {
        try {
            const res = await axios.delete('http://localhost:8888/api/posts/' + id)
            getAllPosts()

        } catch (e) {
            console.error(e)
        }
    }

    const listItem = (post, index) => {
        return (
            <div className="col-12" key={post._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <span className="text-gray-200 text-xs" >{post.updatedAt}</span>
                            <div className="text-2xl font-bold text-900">{post.title}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <span className="font-semibold">{post.body}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-rows align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button icon="pi pi-trash" raised rounded severity="danger" onClick={() => { deletePost(post._id) }}></Button>
                            <Button icon="pi pi-pen-to-square" raised rounded onClick={() => {
                            setBlocked(true)
                            setIsCreating(false)
                            setCurrentPost(post)
                        }} style={{ marginRight: '0.5rem' }}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (post) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={post._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                <span className="text-gray-200 text-xs" >{post.updatedAt}</span>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{post.title}</div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <span className="font-semibold">{post.body}</span>
                        </div>
                    </div>
                    <div className="flex align-items-end ">
                        <Button icon="pi pi-trash" raised rounded severity="danger" onClick={() => deletePost(post._id)} style={{ marginRight: '0.5rem' }}></Button>
                        <Button icon="pi pi-pen-to-square" raised rounded onClick={() => {
                            setBlocked(true)
                            setIsCreating(false)
                            setCurrentPost(post)
                        }} style={{ marginRight: '0.5rem' }}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (post, layout, index) => {
        if (!post) {
            return;
        }

        if (layout === 'list') return listItem(post, index);
        else if (layout === 'grid') return gridItem(post);
    };

    const listTemplate = (posts, layout) => {
        return <div className="grid grid-nogutter" style={{ width: '90%', margin: '0 auto' }}>{posts.map((post, index) => itemTemplate(post, layout, index))}</div>;
    };

    const header = () => {
        return (
            <>
                <h2>Posts</h2>
                <div className="flex" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span>
                        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                    </span>
                    <span>
                        <Button raised icon='pi pi-plus' onClick={() => {
                            setBlocked(true)
                            setIsCreating(true)
                        }}></Button>
                    </span>
                </div>
            </>
        );
    };


    
    return(

        <BlockUI blocked={blocked} template={
            <>
                {isCreating ? <AddPost setBlocked={setBlocked}/> : 
                <UpdatePost setBlocked={setBlocked} currentPost={currentPost}/>}
            </>
        }>
            <div className="card">
                <DataView value={postsList} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
        </BlockUI>
    )
}
export default Posts
