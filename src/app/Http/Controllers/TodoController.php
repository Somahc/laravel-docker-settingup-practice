<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Http\Response;

class TodoController extends Controller
{
    public function add_todo(Request $request)
    {
        $todo = Todo::create([
            'content' => $request->content,
            'user_id' => $request->user_id,
        ]);

        $json = [
            'data' => $todo
        ];

        return response()->json($json, Response::HTTP_OK);
    }

    public function show_todos(Request $request)
    {
        $todos = Todo::where('user_id', $request->user_id)->get();

        $json = [
            'data' => $todos
        ];

        return response()->json($json, Response::HTTP_OK);
    }

    public function show_all_todos()
    {
        $todos = Todo::all();

        $json = [
            'data' => $todos
        ];

        return response()->json($json, Response::HTTP_OK);
    }
}
