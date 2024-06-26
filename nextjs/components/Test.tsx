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

const Test = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const postData = async () => {
        axios.get('http://localhost/sanctum/csrf-cookie').then((res: any) => {
            console.log(res);
            // ログイン処理
            http.post('/api/login', {email, password}).then((res: any) => {
                console.log(res);
                router.push('/add_todo');
            })
        });
    }

    return (
        <div>
            <input
                type="text"
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm'
                placeholder='email'
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            /><br/>
            <input
                type="text"
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm'
                placeholder='password'
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <div>
                <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3"
                    onClick={()=>{
                        postData();
                    }}
                >送信</button>
            </div>
        </div>
    );
}

export default Test;
