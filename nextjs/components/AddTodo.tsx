"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// XSRF-TOKENをリクエスト時に送信するための設定
axios.defaults.withCredentials = true;
const http = axios.create({
    baseURL: 'http://localhost',
    withXSRFToken: true,
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

const AddTodo = () => {
    const [content, setContent] = useState('');
    const [token, setToken] = useState('');
    const [loginUser, setLoginUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        axios.get('http://localhost/sanctum/csrf-cookie').then((res: any) => {
            axios.get('http://localhost/api/user').then((res: any) => {
                setToken(res.data.token);
                setLoginUser(res.data.name);
            })
            .catch((error: any) => {
                if(error.response.status === 401) {
                    router.push('/test');
                } else {
                    console.log(error);
                }
            })
            .catch((error: any) => {
                console.log(error);
            })
        });
    }, []);

    // const postData = async () => {
    //     http.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //     http.post('/api/add_todo', {content}).then((res: any) => {
    //         console.log(res);
    //     });
    // }

    const postData = async () => {
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        http.post('/api/add_todo', { content })
            .then((res: any) => {
                console.log(res);
            })
            .catch((error: any) => {
                // リダイレクトされた場合の処理
                if (error.response.status === 302) {
                    router.push('/test');
                }
            });
    }


    return (
        <div>
            <h1>Todo追加</h1>
            <h2>こんにちは{loginUser}さん</h2>
            <input
                type="text"
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm'
                placeholder='email'
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            /><br/>
            <div>
                <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3"
                    onClick={()=>{
                        postData();
                    }}
                >追加</button>
            </div>
        </div>
    );
}

export default AddTodo;
