<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        $token = $request->cookie('token');
        if ($token) {
            $user = Auth::user();
            return response()->json($user);
        }
        return response()->json('Unauthorized', 401);
    });

    Route::post('/add_todo', 'App\Http\Controllers\TodoController@add_todo');

    Route::get('/show_todos', 'App\Http\Controllers\TodoController@show_todos');
});

Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/login', 'App\Http\Controllers\AuthController@login');

Route::post('/add_todo', 'App\Http\Controllers\TodoController@add_todo');
// Route::middleware('auth:sanctum')->post('/add_todo', 'App\Http\Controllers\TodoController@add_todo');

Route::get('/show_todos', 'App\Http\Controllers\TodoController@show_todos');
// Route::middleware('auth:sanctum')->get('/show_todos', 'App\Http\Controllers\TodoController@show_todos');

Route::get('/show_all_todos', 'App\Http\Controllers\TodoController@show_all_todos');
