<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/login', 'App\Http\Controllers\AuthController@login');

Route::post('/add_todo', 'App\Http\Controllers\TodoController@add_todo');
Route::get('/show_todos', 'App\Http\Controllers\TodoController@show_todos');
Route::get('/show_all_todos', 'App\Http\Controllers\TodoController@show_all_todos');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
